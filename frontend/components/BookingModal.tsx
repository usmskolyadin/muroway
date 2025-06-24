'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type BookingModalProps = {
  tourId: number
  tourTitle: string
}

export default function BookingModal({ tourId, tourTitle }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          telegram,
          tourId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      setIsOpen(false)
      setName('')
      setPhone('')
      setTelegram('')
      router.refresh()
    } catch (err) {
      setError('Failed to submit booking. Please try again.')
      console.error('Booking error:', err)
    } finally {
      setIsSubmitting(false)
    }
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
                Бронирование: {tourTitle}
              </h3>
              <p className="text-center mb-6">Наш менеджер свяжется с вами в течение 30 минут</p>

              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telegram (необязательно)
                    </label>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      className="w-full bg-gray-50 text-black text-sm border border-[#C9CACC] py-3.5 px-4 rounded-2xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-3.5 bg-[#FE5791] text-white rounded-xl font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}