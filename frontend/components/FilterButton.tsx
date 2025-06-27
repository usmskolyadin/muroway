"use client";
import { useState } from "react";
import Image from "next/image";
import { Range, getTrackBackground } from "react-range";

const durationOptions = ['1-3 дня', '4-7 дней', '8-14 дней', '15+ дней'];
const activityOptions = ['умеренная', 'лёгкая', 'интенсивная', 'экстремальная'];
const PRICE_BOUNDARIES = { min: 0, max: 350000 };

export type Filters = {
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
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<[number, number]>([0, PRICE_BOUNDARIES.max]);
  const [duration, setDuration] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);

  const apply = () => {
    onApplyFilters({
      location: location.trim() || undefined,
      priceMin: price[0],
      priceMax: price[1],
      duration: duration || undefined,
      activity: activity || undefined,
    });
    setOpen(false);
  };

  const reset = () => {
    setLocation('');
    setPrice([0, PRICE_BOUNDARIES.max]);
    setDuration(null);
    setActivity(null);
    onApplyFilters({});
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-white flex justify-center items-center shadow"
      >
        <Image src="/filters.svg" alt="filter" width={20} height={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-end md:items-center text-black">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

          <div className="relative bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl overflow-y-auto max-h-[90vh] p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-2xl font-bold">Фильтры</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 text-2xl">✕</button>
            </div>

            {/* Локация */}
            <div>
              <h3 className="font-semibold text-lg">Расположение</h3>
              <input
                type="text"
                placeholder="Страна или локация"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl border bg-gray-50"
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg text-black">Стоимость (₽)</h3>

              <div className="flex gap-2 mt-4 mb-2">
                <input
                  type="number"
                  min={PRICE_BOUNDARIES.min}
                  max={price[1]}
                  value={price[0]}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), price[1]);
                    setPrice([val, price[1]]);
                  }}
                  className="w-1/2 p-2 border rounded-xl text-sm bg-gray-50"
                  placeholder="от"
                />
                <input
                  type="number"
                  min={price[0]}
                  max={PRICE_BOUNDARIES.max}
                  value={price[1]}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), price[0]);
                    setPrice([price[0], val]);
                  }}
                  className="w-1/2 p-2 border rounded-xl text-sm bg-gray-50"
                  placeholder="до"
                />
              </div>

              {/* Ползунок */}
              <div className="px-2">
                <Range
                  values={price}
                  step={1000}
                  min={PRICE_BOUNDARIES.min}
                  max={PRICE_BOUNDARIES.max}
                  onChange={(vals) => setPrice(vals as [number, number])}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '6px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: price,
                            colors: ['#ccc', '#FE5791', '#ccc'],
                            min: PRICE_BOUNDARIES.min,
                            max: PRICE_BOUNDARIES.max,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '20px',
                        width: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        border: '2px solid #FE5791',
                        boxShadow: '0 0 3px rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          height: '8px',
                          width: '8px',
                          borderRadius: '50%',
                          backgroundColor: isDragged ? '#FE5791' : '#ccc',
                        }}
                      />
                    </div>
                  )}
                />
                <div className="flex justify-between text-sm mt-2 text-black">
                  <span>от {price[0].toLocaleString('ru-RU')} ₽</span>
                  <span>до {price[1].toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>


            {/* Продолжительность */}
            <div>
              <h3 className="font-semibold text-lg">Продолжительность</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {durationOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDuration(item)}
                    className={`py-2 px-3 rounded-xl text-sm ${
                      duration === item ? 'bg-pink-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Активность */}
            <div>
              <h3 className="font-semibold text-lg">Активность</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {activityOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActivity(item)}
                    className={`py-2 px-3 rounded-xl text-sm ${
                      activity === item ? 'bg-pink-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex gap-4">
              <button onClick={reset} className="flex-1 p-3 bg-gray-200 rounded-xl font-medium">
                Сбросить
              </button>
              <button
                onClick={apply}
                className="flex-1 p-3 bg-pink-500 text-white rounded-xl font-medium"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
