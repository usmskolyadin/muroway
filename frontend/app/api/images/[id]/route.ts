import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await prisma.image.findUnique({
    where: { id: Number(id) },
    include: { tour: true, program: true },
  });
  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
  return NextResponse.json(image);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const updatedImage = await prisma.image.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(updatedImage);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.image.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
