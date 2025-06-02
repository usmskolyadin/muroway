"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-white flex justify-center items-center"
      >
        <Image 
          className="w-5" 
          src="/filters.svg" 
          alt="filter" 
          width={1000} 
          height={1000} 
          priority 
        />
      </button>

      <div className={`
        fixed inset-0 z-50 max-w-[450px] flex justify-center transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`
          absolute bottom-0 left-0 right-0 bg-white rounded-2xl
          h-[332px] max-h-[332px] overflow-y-auto pb-6
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className="sticky top-0 bg-white z-10 pt-4 px-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-black font-bold">Наш менеджер свяжется с вами в течении 30 минут</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <div className="mt-2">
                <div className="flex items-center  bg-gray-50 rounded-lg text-black">
                  <input 
                    type="text" 
                    placeholder="Номер телефона" 
                    className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center  bg-gray-50 rounded-lg text-black">
                  <input 
                    type="text" 
                    placeholder="Ник в телеграм" 
                    className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                  />
                </div>
              </div>
            </div>


            <button 
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full py-3.5 bg-[#FE5791] text-white rounded-xl font-medium"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}