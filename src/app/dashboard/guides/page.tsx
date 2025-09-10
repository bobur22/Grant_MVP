"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VideoPlayer from "@/app/components/dashboard/VideoPlayer"

const regions = [
  "Toshkent",
  "Buxor",
  "Qashqadaryo",
  "Navoiy",
  "Surxondaryo",
  "Toshkent viloyati",
  "Farg'ona",
  "Andijon",
  "Sirdaryo",
  "Samarqand",
  "Xorazm",
  "Qoraqalpog'iston Respublikasi",
  "Namangan",
]

const tutorials = {
  Toshkent: {
    title: "Toshkent viloyati uchun yo&apos;riqnoma",
    description: "Toshkent viloyatidagi foydalanuvchilar uchun maxsus ko&apos;rsatmalar va qo&apos;llanmalar.",
    thumbnail: "/office.jpg",
  },
  Buxor: {
    title: "Buxor viloyati uchun yo&apos;riqnoma",
    description: "Buxor viloyatidagi jarayonlar va tizimdan foydalanish bo&apos;yicha batafsil ma'lumotlar.",
    thumbnail: "/office.jpg",
  },
  // Add more tutorials for other regions as needed
}

export default function GuidesPage() {
  const [selectedRegion, setSelectedRegion] = useState("Toshkent")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredRegions = regions.filter((region) => region.toLowerCase().includes(searchQuery.toLowerCase()))

  const currentTutorial = tutorials[selectedRegion as keyof typeof tutorials] || tutorials["Toshkent"]

  return (
    <div className="flex h-full bg-[#002b5c]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#1e3a8a] border-r border-blue-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Yo&apos;riqnomalar</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-blue-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              <Input
                placeholder="Qidiruv..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Region List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {filteredRegions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors duration-200
                    ${
                      selectedRegion === region
                        ? "bg-blue-600 text-white"
                        : "text-blue-200 hover:bg-blue-800/50 hover:text-white"
                    }
                  `}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1e3a8a] border-b border-blue-800 p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:bg-blue-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-white">Yo&apos;riqnomalar</h1>
          </div>
        </div>

        {/* Video Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <div className="mb-6">
              <VideoPlayer
                thumbnail={currentTutorial.thumbnail}
                title={currentTutorial.title}
                src="/file_example_MP4_480_1_5MG.mp4" // Uncomment when you have actual video files
              />
            </div>

            {/* Video Title */}
            <h1 className="text-2xl font-bold text-white mb-4">{currentTutorial.title}</h1>

            {/* Video Description */}
            <div className="bg-blue-800/30 rounded-lg p-6">
              <p className="text-blue-100 leading-relaxed">
                Yo&apos;riqnoma – foydalanuvchilarga tizimdan foydalanishni tushunarii qilib ko&apos;rsatadi. Video, matn va
                linklar orqali har bir bosqichni oson bajarish imkonini beradi.
              </p>
              <p className="text-blue-200 mt-4">{currentTutorial.description}</p>
            </div>

            {/* Additional Content */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-blue-800/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Asosiy xususiyatlar</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Bosqichma-bosqich ko&apos;rsatmalar</li>
                  <li>• Video va matnli tushuntirishlar</li>
                  <li>• Amaliy misollar</li>
                  <li>• Tez-tez beriladigan savollar</li>
                </ul>
              </div>

              <div className="bg-blue-800/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Qo&apos;shimcha resurslar</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>
                    •{" "}
                    <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                      PDF qo&apos;llanma
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                      Tez-tez beriladigan savollar
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                      Texnik yordam
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                      Bog'lanish
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
