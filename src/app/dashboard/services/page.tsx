"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ServiceModal from "@/app/components/dashboard/ServiceModal"

const services = [
  {
    id: 1,
    title: "Zulfiya davlat mukofoti",
    image: "/zulfiya-medal.png",
  },
  {
    id: 2,
    title: "Mard o'g'lon davlat mukofoti",
    image: "/mard-uglon-medal.png",
  },
  {
    id: 3,
    title: "El-yurt hurmati ordeni",
    image: "/el-yurt-hurmati-medal.png",
  },
  {
    id: 4,
    title: "El-yurt hurmati ordeni",
    image: "/el-yurt-hurmati-medal.png",
  },
  {
    id: 5,
    title: "Mustaqillik ordeni",
    image: "/mustaqillik-medal.png",
  },
  {
    id: 6,
    title: "Mard o'g'lon davlat mukofoti",
    image: "/mard-uglon-medal.png",
  },
  {
    id: 7,
    title: "Mustaqillik ordeni",
    image: "/mustaqillik-medal.png",
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleServiceClick = (service: (typeof services)[0]) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <div className="flex-1 p-6 bg-[#002B5C] min-h-screen">
      {/* User Profile Section */}
      <div className="bg-[#1e40af] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
            <img src="/person-avatar.jpg" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-1">F.I.SH.</h3>
              <p className="text-blue-200 text-sm">Xasanova Go'zal O'ktam qizi</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Telefon raqam</h3>
              <p className="text-blue-200 text-sm">+998 (94) 855 02 03</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Pochta manzili</h3>
              <p className="text-blue-200 text-sm">xasanovagozal3@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Title */}
      <h1 className="text-white text-2xl font-bold mb-6">Xizmatlar</h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-[76px] h-[106px] object-cover"
                />
              </div>
              <h3 className="text-gray-800 font-medium mb-4 text-sm leading-tight">{service.title}</h3>
              <Button
                className="bg-[#002B5C] hover:bg-[#001a3d] text-white w-full mt-auto"
                size="sm"
                onClick={() => handleServiceClick(service)}
              >
                Batafsil
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ServiceModal isOpen={isModalOpen} onClose={handleCloseModal} service={selectedService} />
    </div>
  )
}
