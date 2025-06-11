"use client";
import { useModal } from "@/context/ModalContext";

export default function DetailButton({ tourId }: { tourId: number }) {
  const { openDetail } = useModal();

  return (
    <button
      onClick={() => openDetail(tourId)}
      className="w-50 text-black text-lg bg-white rounded-lg py-3.5 px-4"
    >
      Подробнее
    </button>
  );
}

