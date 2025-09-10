import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AwardsSection() {
  const awards = [
    {
      id: 1,
      name: '"Zulfiya" davlat mukofoti',
      description:
        "Bu mukofot sportchi va tanqidchilar guruhi tomonidan har yili mukofotlar davri uchun tanlanadi. Mukofot har yili beriladi.",
      image: "/zulfiya-medal.png",
    },
    {
      id: 2,
      name: "\"Mard o&apos;g'lon\" davlat mukofoti",
      description:
        "Bu mukofot vatani himoyasida paxta va faoliyat ko&apos;rsatgan yoshlarga beriladi. Mukofot har yili beriladi.",
      image: "/mard-uglon-medal.png",
    },
    {
      id: 3,
      name: '"Mustaqillik" ordeni',
      description:
        "Bu mukofot sportchi va tanqidchilar guruhi tomonidan har yili mukofotlar davri uchun tanlanadi. Mukofot har yili beriladi.",
      image: "/mustaqillik-medal.png",
    },
    {
      id: 4,
      name: '"El-yurt hurmati" ordeni',
      description:
        "Bu mukofot sportchi va tanqidchilar guruhi tomonidan har yili mukofotlar davri uchun tanlanadi. Mukofot har yili beriladi.",
      image: "/el-yurt-hurmati-medal.png",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">Mukofotlar turlari</h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Davlat mukofotlari — bu nafaqat shaxsiy yutuqlarning e'tirofi, balki butun jamiyat oldida hurmat va
            obro&apos;ning ifodasidir. Platformamiz orqali quyidagi yuqori mukofotlarga ariza topshirish imkoniyati mavjud:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award) => (
            <Card key={award.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <img
                    src={award.image || "/placeholder.svg"}
                    alt={award.name}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4 min-h-[3rem] flex items-center justify-center">
                  {award.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[4rem]">{award.description}</p>
                <Button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2 rounded-md transition-colors duration-200">
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
