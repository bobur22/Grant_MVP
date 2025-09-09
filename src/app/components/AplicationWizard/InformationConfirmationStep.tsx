"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { ApplicationData } from "@/types/application.types"

interface InformationConfirmationStepProps {
  data: ApplicationData
  onSubmit: () => void
  onPrev: () => void
  onCancel: () => void
}

export default function InformationConfirmationStep({
  data,
  onSubmit,
  onPrev,
  onCancel,
}: InformationConfirmationStepProps) {
  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">F.I.SH</h3>
            <p className="text-blue-200">{data.personalInfo.fullName}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">JSHSHIR</h3>
            <p className="text-blue-200">{data.personalInfo.jshshir}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Hudud</h3>
            <p className="text-blue-200">{data.personalInfo.region}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Tuman</h3>
            <p className="text-blue-200">{data.personalInfo.district}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Mahalla</h3>
            <p className="text-blue-200">{data.personalInfo.neighborhood}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Telefon raqam</h3>
            <p className="text-blue-200">{data.personalInfo.phoneNumber}</p>
          </div>
        </div>

        {/* Award Direction & Files */}
        <div className="space-y-4">
          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Faoliyat sohasi</h3>
            <p className="text-blue-200">{data.awardDirection.activityField}</p>
          </div>

          <div className="bg-blue-700/30 rounded p-3">
            <h3 className="text-white font-medium mb-2">Faoliyat haqida</h3>
            <p className="text-blue-200">{data.awardDirection.activityDescription}</p>
          </div>

          {data.achievementConfirmation.recommendationLetter && (
            <div className="bg-blue-700/30 rounded p-3">
              <h3 className="text-white font-medium mb-2">Tavsiya xati</h3>
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-sm">{data.achievementConfirmation.recommendationLetter.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => downloadFile(data.achievementConfirmation.recommendationLetter!)}
                  className="text-white hover:bg-blue-600"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {data.achievementConfirmation.certificates.length > 0 && (
            <div className="bg-blue-700/30 rounded p-3">
              <h3 className="text-white font-medium mb-2">Sertifikatlar</h3>
              <div className="space-y-2">
                {data.achievementConfirmation.certificates.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">{file.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => downloadFile(file)}
                      className="text-white hover:bg-blue-600"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          Orqaga qaytish
        </Button>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            Bekor qilish
          </Button>
          <Button onClick={onSubmit} className="bg-[#FFB222] hover:bg-[#FFB222]/90 text-white">
            Saqlash
          </Button>
        </div>
      </div>
    </div>
  )
}
