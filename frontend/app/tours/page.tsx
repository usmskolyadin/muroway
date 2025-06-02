import { Coin } from "@/components/Coin";
import Tabs from "@/components/Tabs";
import Image from "next/image";

export default function AllQuizes() {
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
            <div className="flex justify-between">
              <h1 className="text-xl uppercase">Квизы</h1>
            </div>
            <div className="min-h-[200px]">
              <Tabs />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
