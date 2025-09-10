"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useAuth} from "@/context/AuthContext";

export default function FAQPage() {
  const {user} = useAuth()

  return (
    <div className="flex-1 p-6 bg-[#002B5C] min-h-screen">
         <div className="bg-[#1e40af] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
            <img src="/person-avatar.jpg" alt="User Avatar" className="w-full h-full object-cover" />
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

      <div className="space-y-6">
        <h1 className="text-white text-2xl font-bold">Ko'p beriladigan savollar</h1>

        <Card className="bg-[#1e3a8a] border-none">
          <CardContent className="p-6">
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger
                    className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  Ochiq vakansiyalarto'g'risida ma'lumotni qayerdan olish bo'ladi?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Davlat idoralari va tashkilotlarning bo'sh ish o'rinlari haqida rasmiy portallar va e'lonlar orqali
                  aholiqqa taqdim etiladigan ochiq axborotdir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  "Mening profilim" dagi ma'lumotlar qay tarzda shakillanadi?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Shaxsiy profil ma'lumotlari foydalanuvchi tomonidan kiritilgan shaxsiy ma'lumotlar, ta'lim, ish
                  tajribasi va malaka sertifikatlari asosida shakllanadi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  Ochiq vakansiya ariza qanday tartibda yuboriladi?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Ochiq vakansiyaga ariza berish uchun tizimga ro'yxatdan o'tish, profil to'ldirish va kerakli
                  hujjatlarni yuklash zarur.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  Vakansiya portali qanday tartibda ro'yxatdan o'tiladi?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Portalga ro'yxatdan o'tish uchun telefon raqam, email manzil va shaxsiy ma'lumotlarni kiritish, SMS
                  orqali tasdiqlash kerak.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  Ochiq vakansiyalarni qaysi mezonlar asosida tanilash imkoniyati mavjud?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Vakansiyalarni hudud, soha, lavozim, maosh miqdori, ish tajribasi talabi va boshqa mezonlar bo'yicha
                  filtrlash mumkin.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 [&[data-state=open]>svg]:rotate-45 [&>svg]:text-white">
                  Ariza holati qanday kuzatiladi?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-blue-200 leading-relaxed">
                  Yuborilgan arizalar holati shaxsiy kabinetda real vaqtda kuzatiladi va har bir bosqich haqida
                  bildirishnoma keladi.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
