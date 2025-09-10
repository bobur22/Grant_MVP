'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Shield, BookOpen, Brain, User, MessageSquare, BarChart3, Wallet, Globe } from "lucide-react"
import Image from "next/image"
import {useAuth} from "@/context/AuthContext";

const legalDocuments = [
  {
    id: "electronic-government",
    title: "Elektron hukumat to'g'risidagi qonun",
    icon: FileText,
    content:
      "Davlat xizmatlari raqamlashtirish, elektron hukumat tizimini rivojlantirish va fuqarolar uchun qulay sharoitlar yaratish to'g'risidagi asosiy qonun hujjatlari va qoidalar.",
  },
  {
    id: "cybersecurity",
    title: "Kiberxfsizlik to'g'risidagi qonun",
    icon: Shield,
    content:
      "Axborot xavfsizligi, kiberxurujlardan himoyalanish, shaxsiy ma'lumotlarni muhofaza qilish va raqamli muhitda xavfsizlikni ta'minlash bo'yicha qonuniy asoslar.",
  },
  {
    id: "information-access",
    title: "Axborot olish kafolatlari va erkinlik to'g'risidagi qonun",
    icon: BookOpen,
    content:
      "Fuqarolarning davlat organlari faoliyati haqida ma'lumot olish huquqi, axborotga ochiq kirish va shaffoflikni ta'minlash bo'yicha qonuniy kafolatlar.",
  },
  {
    id: "ai-strategy",
    title: "Sun'iy intellekt texnologiyalarini rivojlantirish strategiyasi",
    icon: Brain,
    content:
      "Sun'iy intellekt texnologiyalarini joriy etish, rivojlantirish va qo'llash bo'yicha davlat strategiyasi va yo'l xaritasi.",
  },
  {
    id: "personal-data",
    title: "Shaxsga doir ma'lumotlar to'g'risidagi qonun",
    icon: User,
    content:
      "Shaxsiy ma'lumotlarni himoya qilish, qayta ishlash, saqlash va uzatish tartib-qoidalari hamda fuqarolarning shaxsiy ma'lumotlari ustidan nazorat huquqi.",
  },
]
const legalDocumentsRight = [
  {
    id: "appeals",
    title: "Jismoniy va yuridik shaxslarning murojaatlari to'g'risidagi qonun",
    icon: MessageSquare,
    content:
      "Fuqarolar va tashkilotlarning davlat organlariga murojaat qilish tartibi, murojaatlarni ko'rib chiqish va javob berish majburiyatlari.",
  },
  {
    id: "digital-uzbekistan",
    title: "Raqamli O'zbekiston -2030 strategiyasi to'g'risidagi Farmon",
    icon: BarChart3,
    content:
      "2030 yilgacha bo'lgan davrda raqamli iqtisodiyotni rivojlantirish, raqamli texnologiyalarni joriy etish va raqamli transformatsiya strategiyasi.",
  },
  {
    id: "budget-participation",
    title: "Budjet Jarayonida fuqarolarning ishtirokini to'g'risidagi qaror",
    icon: Wallet,
    content:
      "Fuqarolarning davlat byudjeti tuzish va ijro etish jarayonlarida ishtirok etish huquqi va mexanizmlari to'g'risidagi qoidalar.",
  },
  {
    id: "government-portal",
    title: "Yagona interaktiv davlat xizmatlari portali to'g'risidagi qaror",
    icon: Globe,
    content:
      "Yagona davlat xizmatlari portalini yaratish, rivojlantirish va boshqarish, elektron xizmatlarni taqdim etish tartibi va qoidalari.",
  },
]

export default function LegalPage() {
  const { user } = useAuth()

  return (
    <div className="flex-1 p-6 bg-[#002B5C] min-h-screen">
      {/* User Profile Header */}
      <div className="bg-[#1e40af] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
            <img src={user?.profile_picture} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-1">F.I.SH.</h3>
              <p className="text-blue-200 text-sm">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Telefon raqam</h3>
              <p className="text-blue-200 text-sm">{user?.phone_number}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Pochta manzili</h3>
              <p className="text-blue-200 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Documents Section */}
      <div className="space-y-4">
        <h1 className="text-white text-2xl font-bold">Huquqiy Hujjatlar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">  {legalDocuments.map((doc) => {
            const IconComponent = doc.icon
            return (
              <Card key={doc.id} className="bg-blue-800/50 border-blue-700 hover:bg-blue-800/70 transition-colors">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={doc.id} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{doc.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-blue-200 leading-relaxed">{doc.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )
          })}
          </div>
          <div className="space-y-4">
          {legalDocumentsRight.map((doc) => {
            const IconComponent = doc.icon
            return (
              <Card key={doc.id} className="bg-blue-800/50 border-blue-700 hover:bg-blue-800/70 transition-colors">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={doc.id} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{doc.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-blue-200 leading-relaxed">{doc.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
