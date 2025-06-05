"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setTours(data));
  }, []);

  return (
    <div className="relative">
      {/* Кнопка фильтра */}
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

          <div className="grid grid-cols-2 mx-2">
            {tours.map((tour) => (
            <div key={tour.id} className=" mt-2 m-2">
              <div className=" max-w-[165px] max-h-[165px] min-w-[165px] min-h-[165px]">
                <Image 
                  className="max-w-[165px] min-w-[165px] max-h-[165px] min-h-[165px] object-cover rounded-2xl " 
                  src={'/moscow.jpg'} 
                  alt={''} 
                />
              </div>
              <p className="text-md mt-2 text-black font-medium">{tour.title}</p>
            </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}