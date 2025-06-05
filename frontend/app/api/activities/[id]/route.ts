import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest,  { params }: { params: Promise<{ id: string }> } ) {
  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: { id: Number(id) },
    include: { tours: true },
  });

  if (!activity) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 });
  }

  return NextResponse.json(activity);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.activity.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { tours, ...activityData } = body;

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
          durationId: tour.durationId,
          included: tour.included,
          excluded: tour.excluded,
          accommodation: tour.accommodation,
          // и другие поля тура, которые нужно обновить
        },
      })),
    };
  }

  try {
    const updated = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        ...activityData,
        ...(toursUpdateData ? { tours: toursUpdateData } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
  }
}