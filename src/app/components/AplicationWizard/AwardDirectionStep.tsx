"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { AwardDirection } from "@/types/application.types"
import {Input} from "@/components/ui/input";

interface AwardDirectionStepProps {
  data: AwardDirection
  onUpdate: (data: Partial<AwardDirection>) => void
  onNext: () => void
  onPrev: () => void
  onCancel: () => void
}

export default function AwardDirectionStep({ data, onUpdate, onNext, onPrev, onCancel }: AwardDirectionStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const activityFields = [
    "Sport bo'yicha",
    "Fan va texnologiya",
    "Madaniyat va san'at",
    "Ta'lim sohasida",
    "Tibbiyot sohasida",
    "Iqtisodiyot sohasida",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.activityField) newErrors.activityField = "Faoliyat sohasini tanlash majburiy"
    if (!data.source) newErrors.activityField = "Manba haqida ma'lumot kiritish majburiy"
    if (!data.activityDescription.trim()) newErrors.activityDescription = "Faoliyat haqida ma'lumot kiritish majburiy"
    if (data.activityDescription.length < 50) newErrors.activityDescription = "Kamida 50 ta belgi kiritish kerak"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="activityField" className="text-white">
            Faoliyat sohasi
          </Label>
          <Select value={data.activityField} onValueChange={(value) => onUpdate({activityField: value})}>
            <SelectTrigger className="bg-blue-700/50 border-blue-600 text-white">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              {activityFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.activityField && <p className="text-red-400 text-sm">{errors.activityField}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="source" className="text-white">
            Manba
          </Label>
          <Input
              id="source"
              value={data.source}
              onChange={(e) => onUpdate({source: e.target.value})}
              className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
          />
          {errors.source && <p className="text-red-400 text-sm">{errors.source}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="activityDescription" className="text-white">
            Faoliyat haqida
          </Label>
          <Textarea
              id="activityDescription"
              value={data.activityDescription}
              onChange={(e) => onUpdate({activityDescription: e.target.value})}
              rows={8}
              className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300 resize-none"
          />
          <div className="flex justify-between text-sm">
            {errors.activityDescription && <p className="text-red-400">{errors.activityDescription}</p>}
            <p className="text-blue-300">{data.activityDescription.length} belgi</p>
          </div>
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
