import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const perPage = Number(url.searchParams.get('perPage') ?? '10');

  const total = await prisma.activity.count();

  const activities = await prisma.activity.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const start = (page - 1) * perPage;
  const end = Math.min(start + perPage - 1, total - 1);
  const contentRange = `items ${start}-${end}/${total}`;

  return NextResponse.json(activities, {
    headers: {
      'Content-Range': contentRange,
      'Access-Control-Expose-Headers': 'Content-Range',
    },
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newActivity = await prisma.activity.create({ data });
  return NextResponse.json(newActivity, { status: 201 });
}
