import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { uploadToS3 } from '@/lib/s3';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads');

interface Program {
  id: number; 
  dayNumber: number; 
  description: string;
  tourId: number; 
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = Number(params.id);

  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
      duration: true,
      activity: true,
      programs: { include: { images: true } },
      images: true,
    },
  });

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  return NextResponse.json(tour);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);

  try {
    const contentType = req.headers.get('content-type') || '';
    let tourData: any;
    let imageData: any[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      const rawData = formData.get('data') as string;
      tourData = JSON.parse(rawData);
      const files = formData.getAll('images');

      imageData = await Promise.all(
        files
          .filter((file: any) => file && file.name)
          .map(async (file: any) => {
            const url = await uploadToS3(file);
            return {
              url,
              isAccommodation: false,
            };
          })
      );
    } else if (contentType.includes('application/json')) {
      tourData = await req.json();
    } else {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    // Удаляем старые изображения из базы (но НЕ из S3, т.к. для этого нужна отдельная логика)
    await prisma.image.deleteMany({ where: { tourId: id } });

    // Обновляем тур с новыми изображениями
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        title: tourData.title,
        price: tourData.price,
        location: tourData.location,
        description: tourData.description,
        durationId: tourData.durationId,
        activityId: tourData.activityId,
        included: tourData.included,
        excluded: tourData.excluded,
        accommodation: tourData.accommodation,
        images: {
          create: imageData,
        },
      },
      include: {
        programs: true,
        images: true,
      },
    });

    // Обновление изображений программ
    if (Array.isArray(tourData.programs)) {
      for (const programInput of tourData.programs) {
        const program = updatedTour.programs.find((p: Program) => p.dayNumber === programInput.dayNumber);
        if (!program) continue;

        await prisma.image.deleteMany({ where: { programId: program.id } });

        if (Array.isArray(programInput.images) && programInput.images.length > 0) {
          await prisma.image.createMany({
            data: programInput.images.map((img: any) => ({
              url: img.url,
              isAccommodation: img.isAccommodation ?? false,
              programId: program.id,
            })),
          });
        }
      }
    }

    const tourWithAll = await prisma.tour.findUnique({
      where: { id },
      include: {
        duration: true,
        activity: true,
        programs: { include: { images: true } },
        images: true,
      },
    });

    return NextResponse.json(tourWithAll);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = Number(params.id);

  await prisma.tour.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
