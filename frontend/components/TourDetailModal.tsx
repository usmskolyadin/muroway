"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Accordion from "./Accordion";
import BookingModal from "./BookingModal";

export default function TourDetailModal() {
  const { isDetailOpen, selectedTourId, closeDetail } = useModal();
  const [tour, setTour] = useState<any>(null);

  useEffect(() => {
    if (!selectedTourId) return;

    fetch(`/api/tours/${selectedTourId}`)
      .then((res) => res.json())
      .then(setTour);
  }, [selectedTourId]);

  if (!isDetailOpen || !tour) return null;

  return (
      <div className={`
        fixed inset-0  z-50 max-w-[450px] flex justify-center transition-all duration-300 ease-in-out
        ${isDetailOpen  ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Затемнение фона */}
        <div 
          className="absolute inset-0 bg-black/50"
        />
        
        {/* Само модальное окно */}
        <div className={`
          absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl
          h-[98vh] max-h-[98vh] overflow-y-auto pb-6
          transition-transform duration-300 ease-in-out
          ${isDetailOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {/* Заголовок и кнопка закрытия */}
          <div className="z-40 bg-white z-10 pt-4 px-4 pb-2 border-b">

            <div className="flex justify-between items-center">
              <div className="relative  mx-2 py-2">
                <div className="z-50 w-full flex items-center mt-4">
                    <button 
                      className="absolute left-[340px] z-50 w-11 h-11 rounded-full bg-white flex justify-center items-center">
                      <Image
                        className="w-5"
                        src={"/favorite.png"}
                        alt={"filter"}
                        width={1000}
                        height={1000}
                        priority
                      />
                    </button>
                    <button
                      onClick={closeDetail} 
                      className="absolute left-[-2] z-50 w-11 h-11 rounded-full bg-white flex justify-center items-center">
                      <Image
                        className="w-5 transform rotate-90"
                        src={"/top.svg"}
                        alt={"filter"}
                        width={1000}
                        height={1000}
                        priority
                      />
                    </button>
                </div>
              </div>

            </div>
          </div>
          <Image className='min-h-[320px] max-h-[320px] object-cover' src={tour.images[0]?.url} alt={''}  quality={100} fill />

          <div className="mx-4 mt-[285px]">
            <h3 className="font-semibold text-2xl text-black">{tour.title}</h3>
            <p className="text-[#585B5F] text-md font-medium mt-2">{tour.description}</p>
            <div className="flex w-full justify-end">
              <p className="text-black text-md font-medium">Читать всё</p>
            </div>
            <h3 className="font-semibold text-2xl text-black">Программа</h3>
            <Accordion programs={tour.programs} />
            <BookingModal tourId={tour.id} tourTitle={tour.title} />
          </div>
        </div>
      </div>
  );
}
