"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "Qanday boshlayaman?",
    answer:
      "Platformaga ro&apos;yxatdan o&apos;tish uchun 'Kabinet' tugmasini bosing va kerakli ma'lumotlarni kiriting. Jarayon juda oddiy va tez amalga oshiriladi.",
  },
  {
    id: 2,
    question: "Kimlar ariza topshirishi mumkin?",
    answer:
      "o&apos;zbekiston Respublikasi fuqarolari, xorijiy fuqarolar va yuridik shaxslar belgilangan tartibda ariza topshirishi mumkin.",
  },
  {
    id: 3,
    question: "Qaysi hujjatlar kerak bo&apos;ladi?",
    answer:
      "Ariza topshirish uchun pasport, ma'lumotnoma, ish faoliyati haqida ma'lumotlar va boshqa tegishli hujjatlar talab qilinadi.",
  },
  {
    id: 4,
    question: "Fayl formatlari va hajm cheklovlari bormi?",
    answer:
      "Qabul qilinadigan formatlar: PDF, JPG/PNG, DOCX (bozgan ZIP) qo&apos;llab-quvvatlanadi. Ruxsat etilgan format va hajm yuklash qoidalari aniq ko&apos;rsatiladi.",
  },
  {
    id: 5,
    question: "Arizamning holatini qanday bilaman?",
    answer:
      "Shaxsiy kabinetingizda arizangizning real vaqt rejimida holatini kuzatishingiz mumkin. SMS va email orqali xabarnomalar ham keladi.",
  },
]

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(4)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">Ko&apos;p beriladigan savollar</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Biz sizning har bir qadamingizda yo&apos;ldosh bo&apos;lishga tayyormiz.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-sm border transition-all duration-300 cursor-pointer ${
                openItem === item.id ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200 hover:shadow-md"
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Number Circle */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      openItem === item.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.id.toString().padStart(2, "0")}
                  </div>

                  {/* Question and Toggle */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 pr-8">{item.question}</h3>

                    {/* Answer - Expandable */}
                    {openItem === item.id && <div className="mt-3 text-gray-600 leading-relaxed">{item.answer}</div>}
                  </div>

                  {/* Toggle Button */}
                  <button
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors ${
                      openItem === item.id ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {openItem === item.id ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
