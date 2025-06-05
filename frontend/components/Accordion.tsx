'use client'

import { useState } from 'react'
import Image from 'next/image';

interface DayProgram {
  day: string
  title: string
  content: string
  included?: string[]
  excluded?: string[]
  accommodation?: string
}

export default function Accordion() {
  const [activeDay, setActiveDay] = useState<string | null>(null)

  const programData: DayProgram[] = [
    {
      day: "День 1",
      title: "Оливковые холмы",
      content: "",
    },
    {
      day: "День 2",
      title: "Тайны древнегреческих храмов",
      content: "Тур по древним храмам, которые были построены ещё в начале 18 века. Локации располагаются на лазурном берегу Эгейского моря. Пешая тропа длиной 10 км, которую проведет опытный гид с 13 ч...",
    },
    {
      day: "День 3",
      title: "Морские прогулки",
      content: "",
      included: ["обед и ужин", "прогулки по морю"],
      excluded: ["завтрак", "проезд"],
      accommodation: "Four Seasons Hotel 4*"
    }
  ]

  const toggleDay = (day: string) => {
    setActiveDay(activeDay === day ? null : day)
  }

  return (
    <div className="max-w-3xl mx-auto mt-2 space-y-2">
      {programData.map((item) => {
          return (
              <div key={item.day} className="border-b border-[#DFDFDF] overflow-hidden">
                  <button
                      onClick={() => toggleDay(item.day)}
                      className="w-full px-2 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  >
                      <div className="flex justify-between">
                        <div className="flex">
                            <span className="font-medium text-black text-lg truncate w-76">{item.day}: {item.title}</span>
                        </div>
                          <div className="w-5 h-5 ml-4 flex justify-end">
                            <Image src={'/top.svg'} alt={''} width={2} height={2} className={`max-w-4 min-w-4 max-h-4 min-h-4 transform transition-transform ${activeDay === item.day ? 'rotate-180' : ''}`} />
                          </div>
                      </div>
                  </button>

                  {activeDay === item.day && (
                      <div className="p-4 bg-white">
                          {item.content && (
                              <p className="mb-4 text-gray-700">{item.content}</p>
                          )}

                          {(item.included || item.excluded || item.accommodation) && (
                              <div className="space-y-2">
                                  {item.included && (
                                      <div>
                                          <h4 className="font-medium text-green-600">Включено:</h4>
                                          <ul className="list-disc pl-5 mt-1 space-y-1">
                                              {item.included.map((item, idx) => (
                                                  <li key={idx} className="text-gray-600">{item}</li>
                                              ))}
                                          </ul>
                                      </div>
                                  )}

                                  {item.excluded && (
                                      <div>
                                          <h4 className="font-medium text-red-600">Не включено:</h4>
                                          <ul className="list-disc pl-5 mt-1 space-y-1">
                                              {item.excluded.map((item, idx) => (
                                                  <li key={idx} className="text-gray-600">{item}</li>
                                              ))}
                                          </ul>
                                      </div>
                                  )}

                                  {item.accommodation && (
                                      <div>
                                          <h4 className="font-medium text-blue-600">Проживание:</h4>
                                          <p className="text-gray-600 mt-1">{item.accommodation}</p>
                                      </div>
                                  )}
                              </div>
                          )}
                      </div>
                  )}
              </div>
          )
      })}
    </div>
  )
}