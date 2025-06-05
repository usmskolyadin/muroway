import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const program = await prisma.program.findUnique({
    where: { id: Number(id) },
    include: { images: true, tour: true },
  });
  if (!program) return NextResponse.json({ error: "Program not found" }, { status: 404 });
  return NextResponse.json(program);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.program.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const body = await req.json();
  const updated = await prisma.program.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(updated);
}
