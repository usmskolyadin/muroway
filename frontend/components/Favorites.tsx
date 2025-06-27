"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DetailButton from './DetailButton';

type Tour = {
  id: number;
  title: string;
  location: string;
  price: number;
  images: { url: string }[];
};

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  console.log(duration)
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("likedTours");
    const likedIds = stored ? JSON.parse(stored) as number[] : [];

    fetch("/api/tours")
      .then((res) => res.json())
      .then((allTours) => {
        const liked = allTours.filter((tour: Tour) => likedIds.includes(tour.id));
        setTours(liked);
      });
  }, [isOpen]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-white flex justify-center items-center"
      >
        <Image
          className="w-5"
          src={"/favorite.png"}
          alt={"filter"}
          width={1000}
          height={1000}
          priority
        />
      </button>

      <div className={`
        fixed inset-0 z-[99999] max-w-[450px] flex justify-center transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        <div className={`
          z-50
          absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl
          h-[85vh] max-h-[85vh] overflow-y-auto pb-6
          transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className="sticky top-0 bg-white z-10 pt-4 px-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-black font-bold">Понравилось</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 ">
            {tours.map((tour) => (
            <div className="m-4" key={tour.id}>
              <div className="relative w-[165px] h-[165px]">
                <Image 
                  className="object-cover rounded-2xl"
                  src={tour.images[0].url}
                  alt={tour.title}
                  fill
                />
              </div>
              <p className="mt-2 text-md text-black font-medium w-[165px] mb-2">{tour.title}</p>
              <DetailButton tourId={tour.id}/>
              
            </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}