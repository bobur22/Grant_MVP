import Image from "next/image"

export function PlatformInfoSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Platform Advantages */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-12">Platforma afzalliklari</h2>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">10+</div>
                <p className="text-slate-600 text-sm">Mukofot turi</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">10 000+</div>
                <p className="text-slate-600 text-sm">Murojaatlar</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                <p className="text-slate-600 text-sm">Raqam va shaffof xizmat</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
                <p className="text-slate-600 text-sm">Talabnomaga qoniqish darajasi</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/platform-working-image.png"
                alt="Person working at computer"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-16">Ariza topshirish jarayoni qanday ishlaydi?</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-3">Davlat mukofoti marosimi</h3>
              <p className="text-sm text-slate-600">Sizning yutuqlaringiz — bizning iftiximiz</p>

              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-3">Hammasini yagona platformada</h3>
              <p className="text-sm text-slate-600">Ariza berish, hujjat yuklash, holat kuzatuv</p>

              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-3">Mukofot topshirish</h3>
              <p className="text-sm text-slate-600">Rasmiy tadbir — mukofot qo`lga olish, shaxsiy maqtov qog`ozi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
