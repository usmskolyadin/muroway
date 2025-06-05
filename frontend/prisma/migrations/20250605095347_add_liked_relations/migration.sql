-- CreateTable
CREATE TABLE "LikedTour" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "LikedTour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikedTour_userId_tourId_key" ON "LikedTour"("userId", "tourId");

-- AddForeignKey
ALTER TABLE "LikedTour" ADD CONSTRAINT "LikedTour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTour" ADD CONSTRAINT "LikedTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
