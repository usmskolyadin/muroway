import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        tour: {
          select: { title: true },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const data = await req.json()

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: data.status,
        name: data.name,
        phone: data.phone,
        telegram: data.telegram,
        tourId: data.tourId,
      },
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error updating booking:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    await prisma.booking.delete({
      where: { id },
    })

    return new Response(null, { status: 204 })
  } catch (error: any) {
    console.error('Error deleting booking:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
