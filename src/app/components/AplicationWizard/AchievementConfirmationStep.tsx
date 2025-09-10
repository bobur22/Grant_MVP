"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, Upload, X } from "lucide-react"
import type { AchievementConfirmation } from "@/types/application.types"
import {useAuth} from "@/context/AuthContext";

interface AchievementConfirmationStepProps {
  data: AchievementConfirmation
  onUpdate: (data: Partial<AchievementConfirmation>) => void
  onNext: () => void
  onPrev: () => void
  onCancel: () => void
}

export default function AchievementConfirmationStep({
  data,
  onUpdate,
  onNext,
  onPrev,
  onCancel,
}: AchievementConfirmationStepProps) {

  const {user} = useAuth()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const recommendationRef = useRef<HTMLInputElement>(null)
  const certificatesRef = useRef<HTMLInputElement>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.recommendationLetter) newErrors.recommendationLetter = "Tavsiya xati yuklash majburiy"
    if (data.certificates.length === 0) newErrors.certificates = "Kamida bitta sertifikat yuklash majburiy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handleRecommendationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpdate({ recommendationLetter: file })
    }
  }

  const handleCertificatesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onUpdate({ certificates: [...data.certificates, ...files] })
    }
  }

  const removeCertificate = (index: number) => {
    const newCertificates = data.certificates.filter((_, i) => i !== index)
    onUpdate({ certificates: newCertificates })
  }

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
      <div className="space-y-6">
        {/* Recommendation Letter */}
        <div className="space-y-2">
          <Label className="text-white">Tavsiya xati</Label>
          <div className="border-2 border-dashed border-blue-600 rounded-lg p-6 bg-blue-700/20">
            {data.recommendationLetter ? (
              <div className="flex items-center justify-between bg-blue-700/50 rounded p-3">
                <span className="text-white text-sm">{data.recommendationLetter.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadFile(data.recommendationLetter!)}
                    className="text-white hover:bg-blue-600"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onUpdate({ recommendationLetter: null })}
                    className="!text-white hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-blue-300 text-sm mb-2"> {user?.first_name} {user?.last_name}</p>
                <Button
                  variant="outline"
                  onClick={() => recommendationRef.current?.click()}
                  className="!border-blue-600 text-white bg-blue-600 "
                >
                  Fayl tanlash
                </Button>
              </div>
            )}
            <input
              ref={recommendationRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleRecommendationUpload}
              className="hidden"
            />
          </div>
          {errors.recommendationLetter && <p className="text-red-400 text-sm">{errors.recommendationLetter}</p>}
        </div>

        {/* Certificates */}
        <div className="space-y-2">
          <Label className="text-white">Sertifikatlar</Label>
          <div className="border-2 border-dashed border-blue-600 rounded-lg p-6 bg-blue-700/20">
            {data.certificates.length > 0 ? (
              <div className="space-y-2">
                {data.certificates.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-700/50 rounded p-3">
                    <span className="text-white text-sm">{file.name}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadFile(file)}
                        className="text-white hover:bg-blue-600"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCertificate(index)}
                        className="text-white hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => certificatesRef.current?.click()}
                  className="!border-blue-600 text-white bg-blue-600 w-full"
                >
                  Yana fayl qo'shish
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-blue-300 text-sm mb-2">Sertifikatlarni yuklash</p>
                <Button
                  variant="outline"
                  onClick={() => certificatesRef.current?.click()}
                  className="!border-blue-600 text-white bg-blue-600 "
                >
                  Fayl tanlash
                </Button>
              </div>
            )}
            <input
              ref={certificatesRef}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
              onChange={handleCertificatesUpload}
              className="hidden"
            />
          </div>
          {errors.certificates && <p className="text-red-400 text-sm">{errors.certificates}</p>}
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
          <Button onClick={handleNext} className="bg-[#FFB222] hover:bg-[#FFB222]/90 text-white">
            Saqlash
          </Button>
        </div>
      </div>
    </div>
  )
}
