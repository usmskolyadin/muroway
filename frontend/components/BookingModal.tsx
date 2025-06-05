'use client'

import { useState } from 'react'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [contactType, setContactType] = useState<'phone' | 'telegram'>('phone')
  const [contactValue, setContactValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ contactType, contactValue })
    setIsOpen(false)
    setContactValue('')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3.5 bg-[#FE5791] text-white rounded-xl font-medium mt-4"
      >
        Забронировать
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 h-full"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black text-center mb-4">
                Наш менеджер свяжется с вами в течение 30 минут
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex flex-col text-black items-center bg-gray-50 rounded-lg">
                        <input 
                            type="text" 
                            value={contactValue}
                            onChange={(e) => setContactValue(e.target.value)}
                            placeholder="от 0 ₽" 
                            className="w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                        />
                        <h3 className="text-lg font-medium text-black text-center py-2">или</h3>
                        <input 
                            type="text" 
                            placeholder="до 350 000 ₽" 
                            className=" w-full bg-transparent  text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                        />
                    </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full py-3.5 bg-[#FE5791] text-white rounded-xl font-medium z-50"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}