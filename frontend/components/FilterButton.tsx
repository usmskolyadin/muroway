"use client";
import { useState } from 'react';
import Image from 'next/image';

const durationOptions = ['1-3 дня', '4-7 дней', '8-14 дней', '15+ дней'];

type Filters = {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  activity?: string;
};

type FilterButtonProps = {
  onApplyFilters: (filters: Filters) => void;
};

export default function FilterButton({ onApplyFilters }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleApply = () => {
    const filters: Filters = {
      location: location.trim() || undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      duration: duration || undefined,
      activity: activity || undefined,
    };
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setLocation('');
    setPriceMin('');
    setPriceMax('');
    setDuration(null);
    setActivity(null);
    onApplyFilters({});
    setIsOpen(false);
  };

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

      <div className={`fixed inset-0 z-[99999] max-w-[450px] mx-auto flex justify-center transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`z-50 absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl
          h-[85vh] max-h-[85vh] overflow-y-auto pb-6 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          
          <div className="sticky top-0 bg-white z-10 pt-4 px-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-black font-bold">Фильтры</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-xl text-black">Расположение</h3>
              <div className="mt-2">
                <input 
                  type="text" 
                  placeholder="Страна или локация" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-black">Стоимость</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input 
                  type="number" 
                  placeholder="от 0 ₽" 
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                />
                <input 
                  type="number" 
                  placeholder="до 350 000 ₽" 
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-black mb-3">Продолжительность</h3>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDuration(item)}
                    className={`py-2 px-3 rounded-xl text-sm text-center ${duration === item ? 'bg-[#FE5791] text-white' : 'bg-gray-100 text-black'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-black mb-3">Активность</h3>
              <div className="grid grid-cols-2 gap-2">
                {['умеренная', 'лёгкая', 'интенсивная', 'экстремальная'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActivity(item)}
                    className={`py-2 px-3 rounded-xl text-sm text-center ${activity === item ? 'bg-[#FE5791] text-white' : 'bg-gray-100 text-black'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={resetFilters}
                className="flex-1 py-3.5 bg-gray-200 text-black rounded-xl font-medium"
              >
                Сбросить
              </button>
              <button 
                onClick={handleApply}
                className="flex-1 py-3.5 bg-[#FE5791] text-white rounded-xl font-medium"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}