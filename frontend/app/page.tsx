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

export default function Home() {
  const { isDetailOpen } = useModal();
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const currentTour = tours[currentIndex];

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const userData = tg.initDataUnsafe?.user || tg.initData || null;

      if (!userData && tg.initData) {
        const params = new URLSearchParams(tg.initData);
        const data: any = {};
        params.forEach((value, key) => (data[key] = value));

        fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.user) {
              setTgUser(json.user);
            }
          });
      } else if (userData) {
        setTgUser(userData);
      }
    }
  }, []);

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data));
  }, []);

  useEffect(() => {
    if (!currentTour || !tgUser) return;
    fetch(`/api/tours/${currentTour.id}/like?userId=${tgUser.id}`)
      .then((res) => res.json())
      .then((data) => setIsLiked(data.liked));
  }, [currentTour, tgUser]);

  if (!isMounted) {
    return null;
  }
 
  if (!isMounted || tours.length === 0 || !currentTour) {
    return <div className="text-white text-center mt-10">Загрузка туров...</div>;
  }
  if (typeof window !== "undefined" && !window.Telegram?.WebApp) {
    return <div>Откройте приложение через Telegram-бота.</div>;
  }

  const toggleLike = async () => {
    if (!currentTour || !tgUser) return;

    const res = await fetch(`/api/likes?userId=${tgUser.id}&tourId=${currentTour.id}`, {
      method: "POST",
    });
    const result = await res.json();
    setIsLiked(result.liked);
  };

  const nextTour = () => {
    setCurrentIndex((prev) => (prev + 1) % tours.length);
  };

  const prevTour = () => {
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
  };

  return (
    <div className="relative text-white w-full h-screen bg-black overflow-hidden">
          <TourDetailModal />
    
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-1 w-full h-full">
        <Image
          className="object-cover"
          alt={currentTour.title}
          fill
          src={currentTour.images[0]?.url || "/fallback.jpg"}
          quality={100}
          priority
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Верхняя панель */}
      {!isDetailOpen && (
        <div className="relative mx-5 py-8">
          <div className="w-full flex justify-between items-center">
            <div className="relative z-5">
              <FilterButton />
            </div>
            <div className="z-5">
              <Image
                className="w-40"
                src={"/logo.png"}
                alt={"Logo Muroway"}
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

      <div className="absolute bottom-0 z-1 w-full max-w-screen-sm px-4 pb-10 mx-auto left-0 right-0">
        <div className="my-5">
          <h1 className="my-1 text-2xl font-semibold">{currentTour.title}</h1>
          <p className="text-xl">{currentTour.location}</p>
          <p className="text-xl">{currentTour.duration.name}</p>
          {/* Явно указываем локаль, чтобы сервер и клиент рендерили одинаково */}
          <h1 className="my-1 text-4xl font-bold">
            от {Math.floor(currentTour.price).toLocaleString("ru-RU")} ₽
          </h1>
        </div>
        <div className="w-full flex gap-4 justify-between">
          <button
            onClick={prevTour}
            className="min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image className="w-8" src={"/left.png"} alt={"Назад"} width={1000} height={1000} />
          </button>

          <div className="z-[9999]">
            <DetailButton tourId={currentTour.id}/>
          </div>

          <button
            onClick={toggleLike}
            className="min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image
              className="w-8"
              src={isLiked ? "/like-filled.png" : "/like.png"}
              alt={"Like"}
              width={1000}
              height={1000}
            />
          </button>

          <button
            onClick={nextTour}
            className="min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full bg-white flex justify-center items-center"
          >
            <Image className="w-8" src={"/right.png"} alt={"Вперёд"} width={1000} height={1000} />
          </button>
        </div>
      </div>
    </div>
  );
}
