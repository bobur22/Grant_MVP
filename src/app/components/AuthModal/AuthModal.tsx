"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, User, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<{phone?: string; password?: string}>({})

  const { login, isLoading, error, clearError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      clearError()
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setShowLoginForm(false)
        resetForm()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, clearError])

  const resetForm = () => {
    setPhoneNumber("")
    setPassword("")
    setFormErrors({})
    clearError()
  }

  const validateForm = () => {
    const errors: {phone?: string; password?: string} = {}

    if (!phoneNumber.trim()) {
      errors.phone = "Telefon raqam talab qilinadi"
    } else if (!/^\+?998[0-9]{9}$/.test(phoneNumber.replace(/\s/g, ''))) {
      errors.phone = "To`g`ri telefon raqam formatini kiriting"
    }

    if (!password.trim()) {
      errors.password = "Parol talab qilinadi"
    } else if (password.length < 4) {
      errors.password = "Parol kamida 4 ta belgidan iborat bo`lishi kerak"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await login({
        phone_number: phoneNumber.replace(/\s/g, ''),
        password: password,
      })

      // Login muvaffaqiyatli bo'lgandan keyin
      console.log('Login successful, redirecting to dashboard...')
      onClose()
      
      // Biroz kutib redirect qilamiz
      setTimeout(() => {
        window.location.href = '/dashboard'
        router.refresh() // Sahifani refresh qilamiz
      }, 100)
      
    } catch (error) {
      // Xatolik useAuth contextda handle qilinadi
      console.error('Login failed:', error)
    }
  }

  if (!isVisible) return null

  const handleLoginClick = () => {
    setShowLoginForm(true)
  }

  const handleBackToCards = () => {
    setShowLoginForm(false)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative bg-transparent max-w-2xl w-full transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {!showLoginForm ? (
          // Original cards view
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className={`bg-blue-900 rounded-xl p-8 shadow-lg flex-1 text-center transition-all duration-500 hover:scale-105 ${
                isOpen ? "animate-in slide-in-from-bottom-4" : ""
              }`}
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">OneID</h3>

              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium">
                Kirish
              </Button>
            </div>

            <div
              className={`bg-blue-900 rounded-xl p-8 shadow-lg flex-1 text-center transition-all duration-500 hover:scale-105 ${
                isOpen ? "animate-in slide-in-from-bottom-4" : ""
              }`}
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">Login</h3>

              <Button
                onClick={handleLoginClick}
                className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium mb-4"
              >
                Kirish
              </Button>

              <div className="text-sm">
                <span className="text-white">Sahifangiz yo`qmi? </span>
                <Link href="/register" onClick={onClose} className="text-blue-400 underline hover:text-blue-300 transition-colors">
                  Ro`yxatdan O`tish
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={`bg-blue-900 rounded-xl p-8 shadow-lg w-full max-w-md text-center transition-all duration-500 relative ${
                showLoginForm ? "animate-in slide-in-from-right-4" : ""
              }`}
            >
              <button
                onClick={handleBackToCards}
                className="absolute top-4 left-4 text-white hover:text-orange-400 transition-colors"
              >
                ← Orqaga
              </button>

              <h3 className="text-2xl font-bold text-white mb-8">Kirish</h3>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="text-left">
                  <label className="block text-white text-sm font-medium mb-2">Telefon Raqam</label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      if (formErrors.phone) {
                        setFormErrors(prev => ({ ...prev, phone: undefined }))
                      }
                    }}
                    placeholder="+998 XX XXX XX XX"
                    className={`w-full bg-transparent border-2 text-white placeholder:text-gray-300 focus:ring-orange-400 ${
                      formErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-orange-500 focus:border-orange-400'
                    }`}
                    disabled={isLoading}
                  />
                  {formErrors.phone && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div className="text-left">
                  <label className="block text-white text-sm font-medium mb-2">Parol</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (formErrors.password) {
                          setFormErrors(prev => ({ ...prev, password: undefined }))
                        }
                      }}
                      placeholder="Parolingizni kiriting"
                      className={`w-full bg-transparent border-2 text-white placeholder:text-gray-300 focus:ring-orange-400 pr-12 ${
                        formErrors.password ? 'border-red-500 focus:border-red-400' : 'border-gray-400 focus:border-orange-400'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kirish...
                    </>
                  ) : (
                    'Kirish'
                  )}
                </Button>

                <div className="text-sm">
                  <span className="text-white">Avval Ro`yxatdan O`tganmisiz? </span>
                  <Link href="/register" onClick={onClose} className="text-orange-400 underline hover:text-orange-300 transition-colors">
                    Ro`yxatdan O`tish
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}















// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { X, User, Eye, EyeOff, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { useAuth } from "@/context/AuthContext"
// import { useRouter } from "next/navigation"

// interface AuthModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function AuthModal({ isOpen, onClose }: AuthModalProps) {
//   const [isVisible, setIsVisible] = useState(false)
//   const [showLoginForm, setShowLoginForm] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [password, setPassword] = useState("")
//   const [formErrors, setFormErrors] = useState<{phone?: string; password?: string}>({})

//   const { login, isLoading, error, clearError } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (isOpen) {
//       setIsVisible(true)
//       clearError()
//     } else {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         setShowLoginForm(false)
//         resetForm()
//       }, 300)
//       return () => clearTimeout(timer)
//     }
//   }, [isOpen, clearError])

//   const resetForm = () => {
//     setPhoneNumber("")
//     setPassword("")
//     setFormErrors({})
//     clearError()
//   }

//   const validateForm = () => {
//     const errors: {phone?: string; password?: string} = {}

//     if (!phoneNumber.trim()) {
//       errors.phone = "Telefon raqam talab qilinadi"
//     } else if (!/^\+?998[0-9]{9}$/.test(phoneNumber.replace(/\s/g, ''))) {
//       errors.phone = "To'g'ri telefon raqam formatini kiriting"
//     }

//     if (!password.trim()) {
//       errors.password = "Parol talab qilinadi"
//     } else if (password.length < 4) {
//       errors.password = "Parol kamida 4 ta belgidan iborat bo'lishi kerak"
//     }

//     setFormErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!validateForm()) {
//       return
//     }

//     try {
//       await login({
//         phone_number: phoneNumber.replace(/\s/g, ''),
//         password: password,
//       })

//       // Muvaffaqiyatli kirish
//       onClose()
//       router.push('/dashboard')
//     } catch (error) {
//       // Xatolik useAuth contextda handle qilinadi
//       console.error('Login failed:', error)
//     }
//   }

//   if (!isVisible) return null

//   const handleLoginClick = () => {
//     setShowLoginForm(true)
//   }

//   const handleBackToCards = () => {
//     setShowLoginForm(false)
//     resetForm()
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={onClose}
//       />

//       <div
//         className={`relative bg-transparent max-w-2xl w-full transition-all duration-300 ${
//           isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         <button
//           onClick={onClose}
//           className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//         >
//           <X className="h-5 w-5 text-gray-600" />
//         </button>

//         {!showLoginForm ? (
//           // Original cards view
//           <div className="flex flex-col md:flex-row gap-6">
//             <div
//               className={`bg-blue-900 rounded-xl p-8 shadow-lg flex-1 text-center transition-all duration-500 hover:scale-105 ${
//                 isOpen ? "animate-in slide-in-from-bottom-4" : ""
//               }`}
//             >
//               <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                 <User className="h-8 w-8 text-white" />
//               </div>

//               <h3 className="text-2xl font-bold text-white mb-8">OneID</h3>

//               <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium">
//                 Kirish
//               </Button>
//             </div>

//             <div
//               className={`bg-blue-900 rounded-xl p-8 shadow-lg flex-1 text-center transition-all duration-500 hover:scale-105 ${
//                 isOpen ? "animate-in slide-in-from-bottom-4" : ""
//               }`}
//             >
//               <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                 <User className="h-8 w-8 text-white" />
//               </div>

//               <h3 className="text-2xl font-bold text-white mb-8">Login</h3>

//               <Button
//                 onClick={handleLoginClick}
//                 className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium mb-4"
//               >
//                 Kirish
//               </Button>

//               <div className="text-sm">
//                 <span className="text-white">Sahifangiz yo'qmi? </span>
//                 <Link href="/register" onClick={onClose} className="text-blue-400 underline hover:text-blue-300 transition-colors">
//                   Ro'yxatdan O'tish
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex justify-center">
//             <div
//               className={`bg-blue-900 rounded-xl p-8 shadow-lg w-full max-w-md text-center transition-all duration-500 relative ${
//                 showLoginForm ? "animate-in slide-in-from-right-4" : ""
//               }`}
//             >
//               <button
//                 onClick={handleBackToCards}
//                 className="absolute top-4 left-4 text-white hover:text-orange-400 transition-colors"
//               >
//                 ← Orqaga
//               </button>

//               <h3 className="text-2xl font-bold text-white mb-8">Kirish</h3>

//               {error && (
//                 <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
//                   <p className="text-red-300 text-sm">{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleLoginSubmit} className="space-y-6">
//                 <div className="text-left">
//                   <label className="block text-white text-sm font-medium mb-2">Telefon Raqam</label>
//                   <Input
//                     type="tel"
//                     value={phoneNumber}
//                     onChange={(e) => {
//                       setPhoneNumber(e.target.value)
//                       if (formErrors.phone) {
//                         setFormErrors(prev => ({ ...prev, phone: undefined }))
//                       }
//                     }}
//                     placeholder="+998 XX XXX XX XX"
//                     className={`w-full bg-transparent border-2 text-white placeholder:text-gray-300 focus:ring-orange-400 ${
//                       formErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-orange-500 focus:border-orange-400'
//                     }`}
//                     disabled={isLoading}
//                   />
//                   {formErrors.phone && (
//                     <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
//                   )}
//                 </div>

//                 <div className="text-left">
//                   <label className="block text-white text-sm font-medium mb-2">Parol</label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value)
//                         if (formErrors.password) {
//                           setFormErrors(prev => ({ ...prev, password: undefined }))
//                         }
//                       }}
//                       placeholder="Parolingizni kiriting"
//                       className={`w-full bg-transparent border-2 text-white placeholder:text-gray-300 focus:ring-orange-400 pr-12 ${
//                         formErrors.password ? 'border-red-500 focus:border-red-400' : 'border-gray-400 focus:border-orange-400'
//                       }`}
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
//                       disabled={isLoading}
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {formErrors.password && (
//                     <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>
//                   )}
//                 </div>

//                 <Button 
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-200 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Kirish...
//                     </>
//                   ) : (
//                     'Kirish'
//                   )}
//                 </Button>

//                 <div className="text-sm">
//                   <span className="text-white">Avval Ro'yxatdan O'tganmisiz? </span>
//                   <Link href="/register" onClick={onClose} className="text-orange-400 underline hover:text-orange-300 transition-colors">
//                     Ro'yxatdan O'tish
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }