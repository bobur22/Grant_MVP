"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Calendar, Upload } from "lucide-react"
import Link from "next/link"

interface FormData {
  firstName: string
  lastName: string
  fatherName: string
  gender: string
  dateOfBirth: string
  address: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword: string
  workplace: string
  passportSerial: string
  jshshir: string
  photo: File | null
}

interface FormErrors {
  [key: string]: string
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    fatherName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    workplace: "",
    passportSerial: "",
    jshshir: "",
    photo: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validations (letters only)
    const nameRegex = /^[a-zA-ZÀ-ÿ\u0400-\u04FF\s]+$/
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ism majburiy"
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Ism faqat harflardan iborat bo'lishi kerak"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya majburiy"
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Familiya faqat harflardan iborat bo'lishi kerak"
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Otasining ismi majburiy"
    } else if (!nameRegex.test(formData.fatherName)) {
      newErrors.fatherName = "Otasining ismi faqat harflardan iborat bo'lishi kerak"
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Jinsi majburiy"
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Tug'ilgan sana majburiy"
    } else {
      const selectedDate = new Date(formData.dateOfBirth)
      const today = new Date()
      if (selectedDate > today) {
        newErrors.dateOfBirth = "Tug'ilgan sana kelajakda bo'lishi mumkin emas"
      }
    }

    // Phone number validation (Uzbekistan format)
    const phoneRegex = /^\+998\d{9}$/
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon raqam majburiy"
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email majburiy"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email formati noto'g'ri"
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!formData.password) {
      newErrors.password = "Parol majburiy"
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Parol kamida 8 ta belgi, katta va kichik harf, raqam bo'lishi kerak"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Parolni tasdiqlash majburiy"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmaydi"
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Manzil majburiy"
    }

    // Passport serial validation
    const passportRegex = /^[A-Z]{2}\d{7}$/
    if (!formData.passportSerial.trim()) {
      newErrors.passportSerial = "Pasport seriya raqami majburiy"
    } else if (!passportRegex.test(formData.passportSerial)) {
      newErrors.passportSerial = "Pasport seriya raqami AA1234567 formatida bo'lishi kerak"
    }

    // JSHSHIR validation
    const jshshirRegex = /^\d{14}$/
    if (!formData.jshshir.trim()) {
      newErrors.jshshir = "JSHSHIR majburiy"
    } else if (!jshshirRegex.test(formData.jshshir)) {
      newErrors.jshshir = "JSHSHIR 14 ta raqamdan iborat bo'lishi kerak"
    }

    // Photo validation
    if (!formData.photo) {
      newErrors.photo = "Foto majburiy"
    } else {
      const allowedTypes = ["image/jpeg", "image/png"]
      const maxSize = 2 * 1024 * 1024 // 2MB

      if (!allowedTypes.includes(formData.photo.type)) {
        newErrors.photo = "Foto faqat JPG yoki PNG formatida bo'lishi kerak"
      } else if (formData.photo.size > maxSize) {
        newErrors.photo = "Foto hajmi 2MB dan oshmasligi kerak"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, photo: file }))
    if (errors.photo) {
      setErrors((prev) => ({ ...prev, photo: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form Data:", formData)
      router.push("/verify")
    }
  }

  return (
    <div className="min-h-screen bg-[#1e3a8a] flex items-center justify-center p-4">
      <div className="bg-[#1e3a8a] rounded-xl p-8 shadow-lg w-full max-w-md text-center border border-blue-800">
        <h1 className="text-2xl font-bold text-white mb-8">Ro'yxatdan o'tish</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Ism</label>
            <Input
              type="text"
              placeholder="Ismingizni kiriting"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Familiya</label>
            <Input
              type="text"
              placeholder="Familiyangizni kiriting"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* Father's Name */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Otasining ismi</label>
            <Input
              type="text"
              placeholder="Otangizni ismini kiriting"
              value={formData.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.fatherName && <p className="text-red-400 text-xs mt-1">{errors.fatherName}</p>}
          </div>

          {/* Gender */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Jinsi</label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className="w-full bg-transparent border-2 border-gray-400 text-white focus:border-orange-400 focus:ring-orange-400">
                <SelectValue placeholder="Jinsini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Erkak</SelectItem>
                <SelectItem value="female">Ayol</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Date of Birth */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Sana</label>
            <div className="relative">
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className="w-full bg-transparent border-2 border-gray-400 text-white focus:border-orange-400 focus:ring-orange-400"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
            </div>
            {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Address */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Manzil</label>
            <Input
              type="text"
              placeholder="Yashash manzilingizni kiriting"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Phone Number */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Telefon Raqam</label>
            <Input
              type="tel"
              placeholder="Telefon raqamingizni kiriting"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="Emailingizni kiriting"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Parol</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Parolingizni kiriting"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Parolni Tasdiqlang</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Parolni qayta kiriting"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Workplace */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Ish Joyi</label>
            <Input
              type="text"
              placeholder="Ish joyingizni kiriting"
              value={formData.workplace}
              onChange={(e) => handleInputChange("workplace", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          {/* Passport Serial Number */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Pasport Seriya Raqami</label>
            <Input
              type="text"
              placeholder="AA1234567"
              value={formData.passportSerial}
              onChange={(e) => handleInputChange("passportSerial", e.target.value.toUpperCase())}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.passportSerial && <p className="text-red-400 text-xs mt-1">{errors.passportSerial}</p>}
          </div>

          {/* JSHSHIR */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">JSHSHIR</label>
            <Input
              type="text"
              placeholder="12345678901234"
              value={formData.jshshir}
              onChange={(e) => handleInputChange("jshshir", e.target.value)}
              className="w-full bg-transparent border-2 border-gray-400 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            />
            {errors.jshshir && <p className="text-red-400 text-xs mt-1">{errors.jshshir}</p>}
          </div>

          {/* Photo Upload */}
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2">Foto</label>
            <div className="relative">
              <Input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="w-full bg-transparent border-2 border-gray-400 text-white file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 focus:border-orange-400 focus:ring-orange-400"
              />
              <Upload className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
            </div>
            {errors.photo && <p className="text-red-400 text-xs mt-1">{errors.photo}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium mt-6"
          >
            Hisob yaratish
          </Button>

          <div className="text-sm mt-4">
            <span className="text-white">Avval Ro'yxatdan O'tganmisiz? </span>
            <Link href="/login" className="text-orange-400 underline hover:text-orange-300 transition-colors">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
