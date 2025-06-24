import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rangeParam = searchParams.get('range')
  const sortParam = searchParams.get('sort')
  
  const [start = 0, end = 9] = rangeParam ? JSON.parse(rangeParam) : [0, 9]
  const [field = 'id', orderDir = 'asc'] = sortParam ? JSON.parse(sortParam) : ['id', 'asc']

  try {
    const total = await prisma.booking.count()
    const data = await prisma.booking.findMany({
      skip: start,
      take: end - start + 1,
      orderBy: {
        [field]: orderDir.toLowerCase() as 'asc' | 'desc'
      },
      include: {
        tour: {
          select: {
            title: true
          }
        }
      }
    })

    const res = NextResponse.json(data)
    res.headers.set('Content-Range', `items ${start}-${end}/${total}`)
    res.headers.set('Access-Control-Expose-Headers', 'Content-Range')
    return res
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    const requiredFields = ['name', 'phone', 'tourId']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        )
      }
    }

    const created = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        telegram: data.telegram || null,
        tourId: Number(data.tourId),
        status: 'pending'
      }
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}