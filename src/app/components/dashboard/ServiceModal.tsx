"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Share2, Star } from "lucide-react"
import ApplicationWizard from "@/app/components/AplicationWizard/ApplicationWizard"
import Image from "next/image";

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: number
    title: string
    image: string
    description?: string
  } | null
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)

  if (!service) return null

  const serviceDetails = {
    description:
      "Bu mukofot iqtidorli va tashabbuskor qizlarga berilb, ulaming ilm-fan, madaniyat, san'at, sport va ijtimoiy hayotdagi yutuqlarini e'tirof etadi.",
    price: "Bepul",
    documents: [
      "Pasport nusxasi",
      "Ariza (belgilangan shakl bo'yicha)",
      "Yutuqlarni tasdiqlovchi hujjatlar",
      "Tavsiyanoma (ish joyidan yoki ta'lim muassasasidan)",
    ],
    howItWorks: [
      "Onlayn ariza to'ldiring",
      "Kerakli hujjatlarni yuklang",
      "Ekspertlar tomonidan ko'rib chiqiladi",
      "Natija haqida xabar beriladi",
    ],
    legalBasis: "O'zbekiston Respublikasi Prezidentining 2019-yil 6-fevraldagi PF-5649-son Farmoni",
    organization: "O'zbekiston Respublikasi Prezidenti Administratsiyasi",
    contact: {
      phone: "+998 71 239 15 25",
      email: "info@president.uz",
      address: "Toshkent sh., Mustaqillik maydoni, 5",
    },
  }

  const handleUseService = () => {
    setIsApplicationOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#002B5C] border-none text-white p-0">
          <div className="relative">
            {/* Close button */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button> */}

            <div className="p-6">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Award Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-lg p-4 flex items-center justify-center">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title || ''}
                      className="w-[76px] h-full object-cover"
                    />
                  </div>
                </div>

                {/* Award Info */}
                <div className="flex-1">
                  <DialogHeader className="text-left mb-4">
                    <DialogTitle className="text-2xl font-bold text-white mb-2">{service.title}</DialogTitle>
                    <p className="text-blue-200 text-sm leading-relaxed">{serviceDetails.description}</p>
                  </DialogHeader>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-white/20 bg-white/20 hover:bg-white/10  ${isFavorite ? "text-yellow-400" : "text-white"}`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                      Tanlanganiga qo`shish
                    </Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleUseService}>
                      Xizmatlardan foydalanish
                    </Button>
                  </div>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="price" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">💰</span>
                          </div>
                          Xizmat narxi
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11">
                        Davlat xizmatlari raqamlashtirish dasturi doirasida barcha fuqarolar uchun{" "}
                        {serviceDetails.price}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="documents" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">📄</span>
                          </div>
                          Xizmatni olish uchun kerakli hujjatlar
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11">
                        <ul className="space-y-2">
                          {serviceDetails.documents.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="how-it-works" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">⚙️</span>
                          </div>
                          Bu qanday ishlaydi?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11">
                        <ol className="space-y-2">
                          {serviceDetails.howItWorks.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-400 font-semibold">{index + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="contact" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">📞</span>
                          </div>
                          Aloqa
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11 space-y-2">
                        <p>
                          <strong>Telefon:</strong> {serviceDetails.contact.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {serviceDetails.contact.email}
                        </p>
                        <p>
                          <strong>Manzil:</strong> {serviceDetails.contact.address}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="legal-basis" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">⚖️</span>
                          </div>
                          Xizmat ko`rsatishning huquqiy asosi
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11">{serviceDetails.legalBasis}</AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="organization" className="border-white/20">
                      <AccordionTrigger className="text-white hover:text-blue-200 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-xs">🏢</span>
                          </div>
                          Tashkilot
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200 pl-11">{serviceDetails.organization}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ApplicationWizard isOpen={isApplicationOpen} onClose={() => setIsApplicationOpen(false)} service={service} />
    </>
  )
}
