import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-16 bg-[#1e3a5f] relative overflow-hidden">
      {/* Orange geometric decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 transform rotate-45 translate-x-16 -translate-y-16" />
      <div className="absolute top-20 right-20 w-24 h-24 bg-orange-400 transform rotate-45" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-400 transform rotate-45 -translate-x-20 translate-y-20" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Biz haqimizda</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-orange-400 w-24 h-24 absolute -top-6 -left-6 z-0" />
            <div className="relative z-10 bg-white p-2 rounded-lg shadow-lg">
              <Image
                src="/team.png"
                alt="Team working together"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="text-white space-y-6">
            <div>
              <p className="text-orange-400 text-sm font-medium mb-2">Bizning maqsadlar</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Fidoylik, ilmiy salohiyat, ijod va yutuqlarni qadrlash ramzi
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6">
                Biz innovatsion yondashuvlar bilan ijodiy yechimlarni taqdim etamiz. Har bir loyiha — shaxsiyat, har bir
                mijoz — qadrlash.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">Onlayn ariza topshirish — uy yoki ishdan ketib</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">Elektron hujjat yuklash — qog'ozsizlashuv</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">Shaxsiy kabinet — jarayonni kuzatish</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">Shaffof va tezkor natija — axborot beruvchi</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium">
                Bog'laning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
