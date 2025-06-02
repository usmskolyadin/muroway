"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Кнопка фильтра */}
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

      {/* Модальное окно */}
      <div className={`
        fixed inset-0 z-50 max-w-[450px] flex justify-center transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Затемнение фона */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Само модальное окно */}
        <div className={`
          absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl
          h-[90vh] max-h-[90vh] overflow-y-auto pb-6
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {/* Заголовок и кнопка закрытия */}
          <div className="sticky top-0 bg-white z-10 pt-4 px-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-black font-bold">Фильтры</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-2xl text-gray-900 mt-1">Kirill Pristanskov @kirill_pris</p>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-xl text-black">Расположение</h3>
              <div className="mt-2">
                <div className="flex items-center  bg-gray-50 rounded-lg text-black">
                  <input 
                    type="text" 
                    placeholder="Страна или локация" 
                    className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-black">Стоимость</h3>
              <div className="grid grid-cols-2 ">
                <div className="flex text-black items-center bg-gray-50 rounded-lg">
                  <input 
                    type="text" 
                    placeholder="от 0 ₽" 
                    className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                  />
                </div>
                <div className="flex text-black items-center p-3 bg-gray-50 rounded-lg">
                  <input 
                    type="text" 
                    placeholder="до 350 000 ₽" 
                    className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Блок "Продолжительность тура" */}
            <div>
              <h3 className="font-semibold text-xl text-black mb-3">Продолжительность тура</h3>
              <div className="grid grid-cols-3 gap-2">
                {['до 5 дней', 'до 7 дней', 'до 9 дней', 'до 14 дней', '14+ дней'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setDuration(item)}
                    className={`px-0.5 py-1.5 rounded-xl text-sm text-center ${activity === item ? 'bg-[#F6F7F8] text-black' : 'bg-[#585B5F]'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Блок "Активность тура" */}
            <div>
              <h3 className="font-semibold text-xl text-black mb-3">Активность тура</h3>
              <div className="grid grid-cols-3 gap-2">
                {['умеренная', 'лёгкая', 'интенсивная', 'экстремальная'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActivity(item)}
                    className={`px-0.5 py-1.5 rounded-xl text-sm text-center ${activity === item ? 'bg-[#F6F7F8] text-black' : 'bg-[#585B5F]'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопка "Применить" */}
            <button 
              onClick={() => {
                // Здесь логика применения фильтров
                setIsOpen(false);
              }}
              className="w-full py-3.5 bg-[#FE5791] text-white rounded-xl font-medium"
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}