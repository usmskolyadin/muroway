"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DetailButton from "@/components/DetailButton";
import Favorites from "@/components/Favorites";
import FilterButton from "@/components/FilterButton";
import { useModal } from "@/context/ModalContext";
import TourDetailModal from "@/components/TourDetailModal";

type Tour = {
  id: number;
  title: string;
  location: string;
  price: number;
  description: string;
  duration: { name: string };
  images: { url: string }[];
};

type Filters = {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  activity?: string;
};

export default function Home() {
  const { isDetailOpen } = useModal();
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);

  const currentTour = tours[currentIndex];

  useEffect(() => {
    setIsMounted(true);
    fetchTours();
    
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const userData = tg.initDataUnsafe?.user || null;
      if (userData) setTgUser(userData);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [filters]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.location) params.append('location', filters.location);
      if (filters.priceMin) params.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax) params.append('priceMax', filters.priceMax.toString());
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.activity) params.append('activity', filters.activity);

      const response = await fetch(`/api/tours?${params.toString()}`);
      const data = await response.json();
      
      setTours(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const toggleLike = async () => {
    if (!currentTour || !tgUser?.id) return;

    try {
      const res = await fetch(`/api/likes?userId=${tgUser.id}&tourId=${currentTour.id}`, {
        method: "POST",
      });
      const result = await res.json();
      setIsLiked(result.liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const nextTour = () => {
    setCurrentIndex((prev) => (prev + 1) % tours.length);
  };

  const prevTour = () => {
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
  };

  if (!isMounted) return null;

  if (isLoading) {
    return <div className="text-white text-center mt-10">Загрузка туров...</div>;
  }

  if (tours.length === 0) {
    return (
      <div className="relative text-white w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Нет туров по выбранным фильтрам</p>
          <button 
            onClick={() => setFilters({})}
            className="px-6 py-3 bg-[#FE5791] text-white rounded-xl font-medium"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative text-white w-full h-screen bg-black overflow-hidden">
      <TourDetailModal />
      
      <div className="absolute inset-0 z-1 w-full h-full">
        {currentTour.images[0]?.url && (
          <Image
            className="object-cover"
            alt={currentTour.title}
            fill
            src={currentTour.images[0].url}
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            onError={(e) => {
              console.error('Image load error:', e);
            }}
          />
        )}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Верхняя панель */}
      {!isDetailOpen && (
        <div className="relative mx-5 py-8">
          <div className="w-full flex justify-between items-center">
            <div className="relative z-5">
              <FilterButton onApplyFilters={handleApplyFilters} />
            </div>
            <div className="z-5">
              <Image
                className="w-40"
                src="/logo.png"
                alt="Logo Muroway"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <div className="z-5">
              <Favorites />
            </div>
          </div>
        </div>
      )}

      {/* Информация о туре */}
      <div className="absolute bottom-0 z-1 w-full max-w-screen-sm px-4 pb-10 mx-auto left-0 right-0">
        <div className="my-5">
          <h1 className="my-1 text-2xl font-semibold">{currentTour.title}</h1>
          <p className="text-xl">{currentTour.location}</p>
          <p className="text-xl">{currentTour.duration.name}</p>
          <h1 className="my-1 text-4xl font-bold">
            от {Math.floor(currentTour.price).toLocaleString("ru-RU")} ₽
          </h1>
        </div>
        
        {/* Управление */}
        <div className="w-full flex gap-4 justify-between">
          <button
            onClick={prevTour}
            className="min-w-[56px] min-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image className="w-8" src="/left.png" alt="Назад" width={1000} height={1000} />
          </button>

          <div className="z-[9999]">
            <DetailButton tourId={currentTour.id}/>
          </div>

          <button
            onClick={toggleLike}
            className="min-w-[56px] min-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image
              className="w-8"
              src={isLiked ? "/like-filled.png" : "/like.png"}
              alt="Like"
              width={1000}
              height={1000}
            />
          </button>

          <button
            onClick={nextTour}
            className="min-w-[56px] min-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image className="w-8" src="/right.png" alt="Вперёд" width={1000} height={1000} />
          </button>
        </div>
      </div>
    </div>
  );
}