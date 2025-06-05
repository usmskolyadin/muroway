import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromTelegram } from "@/lib/telegramAuth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const user = await getUserFromTelegram(req);
  if (!user) return NextResponse.json([], { status: 401 });

  const likedTours = await prisma.likedTour.findMany({
    where: { userId: user.id },
    include: {
      tour: {
        include: {
          images: true,
        },
      },
    },
  });

  const tours = likedTours.map((like) => like.tour);
  return NextResponse.json(tours);
}
