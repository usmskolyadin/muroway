"use client";
import { useState } from 'react';
import Image from 'next/image';
import Accordion from './Accordion';
import BookingModal from './BookingModal';
import { useModal } from '@/context/ModalContext';

export default function DetailButton() {
  const { isDetailOpen, setIsDetailOpen } = useModal();
  const [duration, setDuration] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  console.log(duration)

  return (
    <div className="relative">
      {/* Кнопка фильтра */}
      <button 
        onClick={() => setIsDetailOpen(true)}
        className="w-35 text-black text-lg bg-white rounded-lg py-3.5 px-4 font-medium">
          Подробнее
      </button>

      {/* Модальное окно */}
      <div className={`
        fixed inset-0  z-50 max-w-[450px] flex justify-center transition-all duration-300 ease-in-out
        ${isDetailOpen  ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Затемнение фона */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsDetailOpen(false)}
        />
        
        {/* Само модальное окно */}
        <div className={`
          absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl
          h-[98vh] max-h-[98vh] overflow-y-auto pb-6
          transition-transform duration-300 ease-in-out
          ${isDetailOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {/* Заголовок и кнопка закрытия */}
          <div className="z-40 sticky top-0 bg-white z-10 pt-4 px-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <Image className='min-h-[320px] object-cover' src={'/moscow.jpg'} alt={''}  quality={100} fill />
              <div className="relative  mx-2 py-2">
                <div className="z-50 w-full flex items-center mt-4">
                    <button 
                      className="absolute left-[300px] z-50 w-11 h-11 rounded-full bg-white flex justify-center items-center">
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
                      onClick={() => setIsDetailOpen(false)} 
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
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mx-4 mt-[285px]">
            <h3 className="font-semibold text-2xl text-black">Греция, какие то там поля в каком то крутом месте</h3>
            <p className="text-[#585B5F] text-md font-medium mt-2">Тур по древним храмам, что то там еще, может быть еще больше, там невероятное количество умопомрачительных деталей</p>
            <div className="flex w-full justify-end">
              <p className="text-black text-md font-medium">Читать всё</p>
            </div>
            <h3 className="font-semibold text-2xl text-black">Программа</h3>
            <Accordion />
            <BookingModal />
          </div>
        </div>
      </div>
    </div>
  );
}