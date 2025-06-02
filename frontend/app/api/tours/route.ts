import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type TourWithRelations = Prisma.TourGetPayload<{
  include: {
    duration: true
    activity: true
    programs: {
      include: {
        images: true
      }
    }
    images: true
  }
}>

type CreateTourInput = {
  title: string
  price: number
  location: string
  description: string
  durationId: number
  activityId: number
  included: string
  excluded: string
  accommodation: string
  programs?: {
    dayNumber: number
    description: string
    images?: {
      url: string
      isAccommodation?: boolean
    }[]
  }[]
  images?: {
    url: string
    isAccommodation?: boolean
  }[]
}

export async function GET(): Promise<NextResponse<TourWithRelations[] | { error: string }>> {
  try {
    const tours = await prisma.tour.findMany({
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
    return NextResponse.json(tours)
  } catch (error) {
    console.error('Failed to fetch tours:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request): Promise<NextResponse<TourWithRelations | { error: string }>> {
  try {
    const tourData: CreateTourInput = await request.json()
    const { programs, images, ...tourBase } = tourData

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient): Promise<TourWithRelations> => {
      const tour = await tx.tour.create({ 
        data: {
          ...tourBase,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      if (programs?.length) {
        await Promise.all(
          programs.map(async (program) => {
            const { images: programImages, ...programBase } = program
            const createdProgram = await tx.program.create({
              data: {
                ...programBase,
                tourId: tour.id
              }
            })

            if (programImages?.length) {
              await tx.image.createMany({
                data: programImages.map(img => ({
                  ...img,
                  programId: createdProgram.id,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }))
              })
            }
          })
        )
      }

      // Создаем изображения тура
      if (images?.length) {
        await tx.image.createMany({
          data: images.map(img => ({
            ...img,
            tourId: tour.id,
            createdAt: new Date(),
            updatedAt: new Date()
          }))
        })
      }

      const fullTour = await tx.tour.findUnique({
        where: { id: tour.id },
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

      if (!fullTour) {
        throw new Error('Tour not found after creation')
      }

      return fullTour
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Failed to create tour:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create tour' },
      { status: 500 }
    )
  }
}