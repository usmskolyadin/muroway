import { Prisma } from '@prisma/client'

type Activity = Prisma.ActivityGetPayload<{}>
type Duration = Prisma.DurationGetPayload<{}>
type Image = Prisma.ImageGetPayload<{}>
type Program = Prisma.ProgramGetPayload<{}>


export interface ITourBase {
  title: string;
  price: number;
  location: string;
  description: string;
  durationId: number;
  activityId: number;
  included: string;
  excluded: string;
  accommodation: string;
}

export interface ITourCreate extends ITourBase {
  programs?: Omit<IProgramCreate, 'tourId'>[];
  images?: Omit<IImageCreate, 'tourId'>[];
}   

export interface ITourUpdate extends Partial<ITourBase> {
  programs?: IProgramUpdate[];
  images?: IImageUpdate[];
}

export interface ITour extends ITourBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  duration?: Duration;
  activity?: Activity;
  programs?: Program[];
  images?: Image[];
}

export interface IProgramBase {
  dayNumber: number;
  description: string;
  tourId: number;
}

export interface IProgramCreate extends IProgramBase {
  images?: Omit<IImageCreate, 'programId'>[];
}

export interface IProgramUpdate extends Partial<IProgramBase> {
  id: number;
  images?: IImageUpdate[];
}

export interface IImageBase {
  url: string;
  isAccommodation?: boolean;
}

export interface IImageCreate extends IImageBase {
  tourId?: number;
  programId?: number;
}

export interface IImageUpdate extends Partial<IImageBase> {
  id: number;
}