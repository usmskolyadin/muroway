'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Program {
  id: number
  dayNumber: number
  description: string
  included?: string[]
  excluded?: string[]
  accommodation?: string
}

export default function Accordion({ programs }: { programs: Program[] }) {
  const [activeDay, setActiveDay] = useState<number | null>(null)

  const toggleDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day)
  }

  const sortedPrograms = [...programs].sort((a, b) => a.dayNumber - b.dayNumber)

  return (
    <div className="max-w-3xl mx-auto mt-2 space-y-2">
      {sortedPrograms.map((prog) => (
        <div key={prog.id} className="border-b border-[#DFDFDF] overflow-hidden">
          <button
            onClick={() => toggleDay(prog.dayNumber)}
            className="w-full px-2 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          >
            <span className="font-medium text-black text-lg truncate w-76">
              День {prog.dayNumber}
            </span>
            <div className="w-5 h-5 ml-4 flex justify-end">
              <Image
                src="/top.svg"
                alt=""
                width={16}
                height={16}
                className={`transform transition-transform ${activeDay === prog.dayNumber ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {activeDay === prog.dayNumber && (
            <div className="p-4 bg-white">
              {prog.description && (
                <p className="mb-4 text-gray-700 whitespace-pre-line">{prog.description}</p>
              )}

              {(prog.included || prog.excluded || prog.accommodation) && (
                <div className="space-y-2">
                  {prog.included && (
                    <div>
                      <h4 className="font-medium text-green-600">Включено:</h4>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {prog.included.map((item, idx) => (
                          <li key={idx} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {prog.excluded && (
                    <div>
                      <h4 className="font-medium text-red-600">Не включено:</h4>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {prog.excluded.map((item, idx) => (
                          <li key={idx} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {prog.accommodation && (
                    <div>
                      <h4 className="font-medium text-blue-600">Проживание:</h4>
                      <p className="text-gray-600 mt-1">{prog.accommodation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
