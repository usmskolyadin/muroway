import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = Promise<{ id: number }>

export async function GET(
        request: NextRequest,
        { params }: { params: Params }
    ) {
  try {
    const { id } = await params
    const tourId = Number(id)

    if (isNaN(tourId)) {
      return NextResponse.json({ error: 'Invalid tour ID' }, { status: 400 })
    }

    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      include: {
        duration: true,
        activity: true,
        programs: {
          include: {
            images: true
          }
        },
        images: true
      }
    })

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    return NextResponse.json(tour)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
    request: NextRequest, 
    { params }: { params: Params }
  ) {
  try {
    const { id } = await params
    const tourId = Number(id)
    
    if (isNaN(tourId)) {
      return NextResponse.json({ error: 'Invalid tour ID' }, { status: 400 })
    }

    const body = await request.json()
    const updatedTour = await prisma.tour.update({
      where: { id: tourId },
      data: body
    })

    return NextResponse.json(updatedTour)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Params }
  ) {
  try {
    const { id } = await params
    const tourId = Number(id)
    
    if (isNaN(tourId)) {
      return NextResponse.json({ error: 'Invalid tour ID' }, { status: 400 })
    }

    await prisma.tour.delete({
      where: { id: tourId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}