import FilterButton from "@/components/FilterButton";
import Image from "next/image";

export default function AllTours() {
  return (
    <div className="flex justify-center">
      <div className=" text-white w-full h-full min-h-[1000px] bg-black relative">
        <div className="absolute inset-0 z-10 w-full h-full">
          <Image 
            className="object-cover"
            alt="fsd" 
            fill
            src={"/moscow.jpg"}
            quality={100}
            priority
          />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/70 to-transparent"></div>
    
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
    
        <div className="relative z-10 mx-5 py-8 ">
          <div className="w-full flex justify-between items-center">
            <div>
            </div>

            <div className="">
              <Image className="w-40" src={"/logo.png"} alt={"Logo Muroway"} width={1000} height={1000} priority />
            </div>

            <div>
              <button className="w-11 h-11 rounded-full bg-white flex justify-center items-center">
                <Image className="w-5" src={"/favorite.png"} alt={"filter"} width={1000} height={1000} priority />
              </button>
            </div>
            
            
            
          </div>
          <div className="mt-[550px]">
            <div className="my-5">
              <h1 className="my-1 text-2xl font-semibold">Греция. Оливковые холмы и тайны древних холмов</h1>
              <p className="text-xl">Афины, Пелоннес</p>
              <p className="text-xl">10 дней 9 ночей</p>
              <h1 className="my-1 text-4xl font-bold">от 98 000 ₽</h1>
            </div>
            <div className="w-full flex gap-4 justify-between ">
            
              <button className="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full bg-white flex justify-center items-center">
                <Image className="w-8" src={"/left.png"} alt={"filter"} width={1000} height={1000} priority />
              </button>
              <button className="w-50 text-black text-lg bg-white rounded-lg py-2 px-4">
                Подробнее
              </button>
              <button className="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full bg-white flex justify-center items-center">
                <Image className="w-8" src={"/like.png"} alt={"filter"} width={1000} height={1000} priority />
              </button>
              <button className="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full bg-white flex justify-center items-center">
                <Image className="w-8" src={"/right.png"} alt={"filter"} width={1000} height={1000} priority />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
