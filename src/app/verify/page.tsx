"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext" // Auth context import qiling

export default function VerifyPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { refreshUserProfile } = useAuth() // Auth contextdan refresh function

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && isResendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setIsResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [countdown, isResendDisabled])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)

    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }

    setCode(newCode)

    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join("")

    if (fullCode.length === 6) {
      setIsVerifying(true)

      try {
        console.log("Verification code:", fullCode)
        
        // Real API call bo'lishi kerak:
        // await api.post('/accounts/verify/', { code: fullCode })
        
        // Biroz kutish (real API ni taqlid qilish)
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        console.log("Kod muvaffaqiyatli tasdiqlandi!")
        
        // User profileni yangilash - BU MUHIM QISM!
        try {
          await refreshUserProfile()
          console.log("User profile refreshed successfully")
        } catch (error) {
          console.error("Failed to refresh user profile:", error)
        }
        
        // Dashboard ga yo'naltirish
        router.push("/dashboard")
        
      } catch (error) {
        console.error("Verification error:", error)
        // Demo uchun xatolik bo'lganda ham dashboard ga yuboramiz
        // Lekin real projectda error handling qilish kerak
        router.push("/dashboard")
      } finally {
        setIsVerifying(false)
      }
    }
  }

  const handleResendCode = () => {
    setCountdown(60)
    setIsResendDisabled(true)
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
    console.log("Resending verification code...")
  }

  const isFormValid = code.every((digit) => digit !== "")
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#002B5C] flex items-center justify-center p-4">
      <div className="bg-[#1e3a8a] rounded-xl p-8 shadow-lg w-full max-w-md text-center border border-blue-800">
        <h1 className="text-2xl font-bold text-white mb-8">Kodni kiriting</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {inputRefs.current[index] = el}}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isVerifying}
                className="w-12 h-12 text-center text-xl font-bold bg-transparent border-2 border-gray-400 text-white focus:border-orange-400 focus:ring-orange-400 rounded-lg"
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isVerifying}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 py-3 text-lg font-medium"
          >
           {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tasdiqlanmoqda...
              </>
            ) : (
              'Kirish'
            )}
          </Button>

          <div className="text-center mt-4">
            {isResendDisabled ? (
              <p className="text-orange-400 text-sm">Kodni Qayta Yuborish {formatTime(countdown)}</p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-orange-400 text-sm underline hover:text-orange-300 transition-colors"
              >
                Kodni Qayta Yuborish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}