"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Grid3X3, Scale, HelpCircle, BookOpen, History, Menu, X, Phone, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"

const menuItems = [
  { href: "/dashboard", label: "Mening Arizalarim", icon: FileText },
  { href: "/dashboard/services", label: "Xizmatlar & Ariza berish", icon: Grid3X3 },
  { href: "/dashboard/legal", label: "Huquqiy Savollar", icon: Scale },
  { href: "/dashboard/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dashboard/guides", label: "Yo'riqnomalar", icon: BookOpen },
  { href: "/dashboard/history", label: "Amaliyotlar tarixi", icon: History },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return user?.phone_number || 'Foydalanuvchi'
  }

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    }
    return user?.phone_number?.slice(-2) || 'FU'
  }

  return (
    <ProtectedRoute>
      <div className="h-screen bg-[#002B5C] flex">
        {/* Sidebar */}
        <div
          className={`${isSidebarCollapsed ? "w-16" : "w-64"} bg-[#002B55] border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col`}
        >
          {/* Logo and Toggle */}
          <div className="px-4 py-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div
                className={`bg-white rounded-lg ${isSidebarCollapsed ? "w-8 h-8" : "w-12 h-12"} transition-all duration-300`}
              ></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-white hover:bg-blue-800 p-2 mt-1"
              >
                {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 pt-8 pr-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Contact and Logout Buttons */}
          <div className="p-4 space-y-2">
            <Button
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${
                isSidebarCollapsed ? "px-2" : "px-4"
              } py-2 transition-all duration-300`}
            >
              <img src="/communicate-logo.svg" alt="" />
              {!isSidebarCollapsed && <span className="ml-2">Aloqa</span>}
            </Button>
            
            {/* <Button
              onClick={handleLogout}
              className={`w-full bg-red-600 hover:bg-red-700 text-white ${
                isSidebarCollapsed ? "px-2" : "px-4"
              } py-2 transition-all duration-300`}
            >
              <LogOut size={16} className="flex-shrink-0" />
              {!isSidebarCollapsed && <span className="ml-2">Chiqish</span>}
            </Button> */}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <header className="bg-[#061626]  px-6 py-4 flex items-center justify-between">
            {/* Left side - Greeting */}
            <div>
              <h1 className="text-white text-xl font-semibold">
                Salom {`Xasanova Go'zal`}
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                Shaxsiy kabinet orqali siz mukofotlarga oid barcha jarayonlarni boshqarishingiz mumkin
              </p>
            </div>

            {/* Right side - Notifications and Avatar */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800 p-2 rounded-lg">
                <Bell size={20} />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarImage src="/professional-woman-avatar.png" alt="User Avatar" />
                <AvatarFallback className="bg-blue-600 text-white">
                <img src="/person-avatar.jpg" alt="Xasanova Go'zal" />
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto  bg-[#061626]">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}