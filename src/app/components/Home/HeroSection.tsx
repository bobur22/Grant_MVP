import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-[#1e3a5f] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-12 left-16 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-16 left-12 w-2 h-2 bg-orange-400 rounded-full"></div>

        <div className="absolute bottom-16 left-16 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 left-24 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-24 left-20 w-2 h-2 bg-orange-400 rounded-full"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-8 translate-y-4 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-4 translate-y-8 w-2 h-2 bg-orange-400 rounded-full"></div>
      </div>

      {/* Orange geometric shapes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3">
        <div className="absolute right-0 top-0 w-32 h-full bg-orange-400 transform skew-x-12 origin-top-right"></div>
        <div className="absolute right-24 top-0 w-16 h-full bg-orange-500 transform skew-x-12 origin-top-right"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Davlat mukofotlari — Sizning yutuqlaringiz e`tirofi
            </h1>

            <p className="text-lg lg:text-xl text-blue-100 leading-relaxed max-w-2xl">
              Sizning fidoyiligingiz, bilim va iste`dodingiz davlat miqyosida qadrlanishga loyiq. Endi mukofotga nomzod
              bo`lish yanada qulay, tezkor va shaffof jarayonga aylandi.
            </p>

            <div className="pt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
                Bog`laning
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/hero-image.png"
                alt="Government officials"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
