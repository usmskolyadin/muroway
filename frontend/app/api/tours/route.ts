// app/api/tours/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';
import { uploadToS3 } from '@/lib/s3';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const _page = Number(searchParams.get('page') || '1');
  const _perPage = Number(searchParams.get('perPage') || '10');
  const _sortField = searchParams.get('sortField') || 'id';
  const _sortOrder = searchParams.get('sortOrder') || 'ASC';

  const skip = (_page - 1) * _perPage;
  const take = _perPage;
  const total = await prisma.tour.count();

  const tours = await prisma.tour.findMany({
    skip,
    take,
    orderBy: { [_sortField]: _sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc' },
    include: {
      duration: true,
      activity: true,
      programs: { include: { images: true } },
      images: true,
    },
  });

  const start = skip;
  const end = Math.min(skip + take - 1, total - 1);
  const contentRange = `items ${start}-${end}/${total}`;

  return NextResponse.json(tours, {
    status: 200,
    headers: {
      'Content-Range': contentRange,
      'Access-Control-Expose-Headers': 'Content-Range',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const rawData = formData.get('data') as string;
    const tourData = JSON.parse(rawData);

    const files = formData.getAll('images');

    const imageData = await Promise.all(
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

    // Создаем тур с изображениями из S3
    const newTour = await prisma.tour.create({
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
        programs: {
          create: (tourData.programs ?? []).map((program: any) => ({
            dayNumber: program.dayNumber,
            description: program.description,
          })),
        },
      },
      include: {
        programs: true,
      },
    });

    for (const program of newTour.programs) {
      const original = tourData.programs.find((p: any) => p.dayNumber === program.dayNumber);
      if (original?.images?.length) {
        await prisma.image.createMany({
          data: original.images.map((img: any) => ({
            url: img.url,
            isAccommodation: img.isAccommodation ?? false,
            programId: program.id,
          })),
        });
      }
    }

    const tourWithAll = await prisma.tour.findUnique({
      where: { id: newTour.id },
      include: {
        duration: true,
        activity: true,
        programs: { include: { images: true } },
        images: true,
      },
    });

    return NextResponse.json(tourWithAll, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}