import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const duration = await prisma.duration.findUnique({
    where: { id: Number(id) },
    include: { tours: true }, // если нужно
  });
  if (!duration) {
    return NextResponse.json({ error: "Duration not found" }, { status: 404 });
  }
  return NextResponse.json(duration);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  const { tours, ...durationData } = data;

  let toursUpdateData = undefined;

  if (Array.isArray(tours)) {
    toursUpdateData = {
      updateMany: tours.map((tour: any) => ({
        where: { id: tour.id },
        data: {
          title: tour.title,
          price: tour.price,
          location: tour.location,
          description: tour.description,
          included: tour.included,
          excluded: tour.excluded,
          accommodation: tour.accommodation,
          activityId: tour.activityId,
        },
      })),
    };
  }

  const updatePayload = {
    ...durationData,
    ...(toursUpdateData ? { tours: toursUpdateData } : {}),
  };

  try {
    const updated = await prisma.duration.update({
      where: { id: Number(id) },
      data: updatePayload,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.duration.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
