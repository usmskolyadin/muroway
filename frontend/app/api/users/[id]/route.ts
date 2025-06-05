import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ success: true });
}
