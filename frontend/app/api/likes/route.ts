import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromTelegram } from "@/lib/telegramAuth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const tourIdParam = url.searchParams.get("tourId");
  const tourId = parseInt(tourIdParam || "", 10);

  if (isNaN(tourId)) {
    return NextResponse.json({ error: "Invalid tourId" }, { status: 400 });
  }

  const user = await getUserFromTelegram(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const alreadyLiked = await prisma.likedTour.findUnique({
    where: {
      userId_tourId: {
        userId: user.id,
        tourId,
      },
    },
  });

  if (alreadyLiked) {
    await prisma.likedTour.delete({
      where: {
        userId_tourId: {
          userId: user.id,
          tourId,
        },
      },
    });
    return NextResponse.json({ liked: false });
  } else {
    await prisma.likedTour.create({
      data: {
        userId: user.id,
        tourId,
      },
    });
    return NextResponse.json({ liked: true });
  }
}
