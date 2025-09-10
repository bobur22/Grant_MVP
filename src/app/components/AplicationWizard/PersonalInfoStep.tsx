"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import type {PersonalInfo} from "@/types/application.types"

interface PersonalInfoStepProps {
    data: PersonalInfo
    onUpdate: (data: Partial<PersonalInfo>) => void
    onNext: () => void
    onCancel: () => void
}

export default function PersonalInfoStep({data, onUpdate, onNext, onCancel}: PersonalInfoStepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const regions = [
        {key: "Andijon", label: "Andijon viloyati"},
        {key: "Buxoro", label: "Buxoro viloyati"},
        {key: "Fargona", label: "Fargʻona viloyati"},
        {key: "Jizzax", label: "Jizzax viloyati"},
        {key: "Namangan", label: "Namangan viloyati"},
        {key: "Navoiy", label: "Navoiy viloyati"},
        {key: "Qashqadaryo", label: "Qashqadaryo viloyati"},
        {key: "Qoraqalpogiston", label: "Qoraqalpogʻiston Respublikasi"},
        {key: "Samarqand", label: "Samarqand viloyati"},
        {key: "Sirdaryo", label: "Sirdaryo viloyati"},
        {key: "Surxondaryo", label: "Surxondaryo viloyati"},
        {key: "Toshkent", label: "Toshkent viloyati"},
        {key: "Toshkent_shahri", label: "Toshkent shahri"},
        {key: "Xorazm", label: "Xorazm viloyati"},
    ]



    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!data.fullName.trim()) newErrors.fullName = "F.I.SH. kiritish majburiy"
        if (!data.jshshir.trim()) newErrors.jshshir = "JSHSHIR kiritish majburiy"
        if (data.jshshir && !/^\d{14}$/.test(data.jshshir))
            newErrors.jshshir = "JSHSHIR 14 ta raqamdan iborat bo'lishi kerak"
        if (!data.region) newErrors.region = "Hududni tanlash majburiy"
        if (!data.district) newErrors.district = "Tumanni tanlash majburiy"
        if (!data.neighborhood.trim()) newErrors.neighborhood = "Mahallani kiritish majburiy"
        if (!data.phoneNumber.trim()) newErrors.phoneNumber = "Telefon raqamini kiritish majburiy"
        // if (data.phoneNumber && !/^\+998$$\d{2}$$\s\d{3}\s\d{2}\s\d{2}$/.test(data.phoneNumber)) {
        //   newErrors.phoneNumber = "Telefon raqami noto'g'ri formatda"
        // }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateForm()) {
            onNext()
        }
    }

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "")
        if (numbers.startsWith("998")) {
            const formatted = numbers.slice(3)
            if (formatted.length >= 2) {
                let result = `+998(${formatted.slice(0, 2)})`
                if (formatted.length > 2) result += ` ${formatted.slice(2, 5)}`
                if (formatted.length > 5) result += ` ${formatted.slice(5, 7)}`
                if (formatted.length > 7) result += ` ${formatted.slice(7, 9)}`
                return result
            }
        }
        return value
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                        F.I.SH
                    </Label>
                    <Input
                        id="fullName"
                        value={data.fullName}
                        onChange={(e) => onUpdate({fullName: e.target.value})}
                        className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                    {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jshshir" className="text-white">
                        JSHSHIR
                    </Label>
                    <Input
                        id="jshshir"
                        value={data.jshshir}
                        onChange={(e) => onUpdate({jshshir: e.target.value.replace(/\D/g, "").slice(0, 14)})}
                        className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                    {errors.jshshir && <p className="text-red-400 text-sm">{errors.jshshir}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="region" className="text-white">
                        Hudud
                    </Label>
                    <Select value={data.region} onValueChange={(value) => onUpdate({region: value, district: ""})}>
                        <SelectTrigger className="bg-blue-700/50 border-blue-600 text-white">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region.key} value={region.key}>
                                    {region.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.region && <p className="text-red-400 text-sm">{errors.region}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="district" className="text-white">
                        Tuman
                    </Label>
                    <Input
                        id="district"
                        value={data.district}
                        onChange={(e) => onUpdate({district: e.target.value})}
                        className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                    {errors.district && <p className="text-red-400 text-sm">{errors.district}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="text-white">
                        Mahalla
                    </Label>
                    <Input
                        id="neighborhood"
                        value={data.neighborhood}
                        onChange={(e) => onUpdate({neighborhood: e.target.value})}
                        className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                    {errors.neighborhood && <p className="text-red-400 text-sm">{errors.neighborhood}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white">
                        Telefon raqam
                    </Label>
                    <Input
                        id="phoneNumber"
                        value={data.phoneNumber}
                        onChange={(e) => onUpdate({phoneNumber: formatPhoneNumber(e.target.value)})}
                        className="bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                    {errors.phoneNumber && <p className="text-red-400 text-sm">{errors.phoneNumber}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
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
    )
}
