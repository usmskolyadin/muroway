import { Coin } from "@/components/Coin";
import Image from "next/image";

export default function Detail() {
  return (
    <div className="bg-white flex justify-between items-center">
      <div className="text-white min-w-[320px] min-h-[741px] max-w-[320px] max-h-[741px] bg-black relative">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image 
              src="/telek.png" 
              alt="Decorative overlay"
              fill
              className="object-contain opacity-35"
              style={{ mixBlendMode: 'lighten' }} 
            />
          </div>
        <header className="flex py-5 items-center text-white justify-between mx-4">
          <div className="flex justify-between items-center">
            <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0.5V1.5H8V3.5H6V5.5H4V7.5H2V8.5H1V9.5H0V11.5H1V12.5H2V13.5H4V15.5H6V17.5H7H8V18.5V19.5H10V20.5H12V17.5H10V15.5H8V13.5H6V11.5H4V9.5H6V7.5H8V5.5H10V3.5H12V0.5H10Z" fill="white"/>
            </svg>
            <p className="uppercase text-md ml-2">назад</p>
          </div>
          <div className="flex">
            <p className="mr-2">999</p>
            <Coin />
          </div>
        </header>
        <main className="flex flex-col mx-4">
          <section className="">
            
            <div className="relative border-2 border-white w-full bg-white">
              <div className="w-full h-6 bg-[#010089]">
                <p className="uppercase px-2 text-xs py-1">Музыка</p>
              </div>
              <Image className="max-h-40 object-cover" src={"/item.png"} alt={""} width={1000} height={100}/>
              <div className="absolute max-h-46 inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)]" />
              <div className="px-2 py-2">
              <div className=" flex justify-between">
                <h3 className="uppercase text-xl mt-1 text-black">ОТКУДА СЕМПЛ ??</h3>
                <div className="bg-[#CECECE]">
                  <div className="flex items-center py-2 px-2">
                    <p className="mr-2 text-xs text-black ">999</p>
                    <Coin />
                  </div>
                </div>  
              </div>
              <div className="py-2">
                <h2 className="text-black text-xs mb-1">Соавтор</h2>
                <div className="flex items-center">
                  <Image className="w-8 h-8 rounded-full object-cover" src={"/swag.png"} alt={""} width={100} height={100} />
                  <h2 className="uppercase text-black text-xs ml-2">Виталий</h2>
                </div>
              </div>
              <p className="text-black text-xs">Готов пройти тест, который опкажет на кого-то похож из репперов? Тогда скорее проходи тест!</p>
              <button className="bg-[#0100BE] px-4 py-2 w-full mt-2">Пройти</button>
              </div>
            </div>

          </section>
        </main>
      </div>


    </div>
  );
}
