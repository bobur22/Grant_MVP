"use client"

import React from "react"
import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {FileText, Grid3X3, Scale, HelpCircle, BookOpen, History, Menu, X,  Bell, User, LogOut, ChevronDown} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useAuth} from "@/context/AuthContext"
import {ProtectedRoute} from "@/components/ProtectedRoute"
import Image from "next/image";
import { useRouter } from "next/navigation"
import {formatUserName, getUserInitials} from "@/lib/utils"

const menuItems = [
    {href: "/dashboard", label: "Mening Arizalarim", icon: FileText},
    {href: "/dashboard/services", label: "Xizmatlar & Ariza berish", icon: Grid3X3},
    {href: "/dashboard/legal", label: "Huquqiy Savollar", icon: Scale},
    {href: "/dashboard/faq", label: "FAQ", icon: HelpCircle},
    {href: "/dashboard/guides", label: "Yo'riqnomalar", icon: BookOpen},
    {href: "/dashboard/history", label: "Amaliyotlar tarixi", icon: History},
]

export default function DashboardLayout({ children  }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const pathname = usePathname()
    const {user, unreadNotificationCount, logout} = useAuth() // AuthContext dan notification count oling
    const router = useRouter();
 // Logout funksiyasi
 const handleLogout = async () => {
    try {
        await logout();
        // logout funksiyasi o'zi Home page ga yo'naltiradi
    } catch (error) {
        console.error('Logout error:', error);
        // Xatolik bo'lsa ham Home page ga yo'naltirish
        router.push('/');
    }
};
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
                            {isSidebarCollapsed ? <Menu size={20}/> : <X size={20}/>}
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
                                <Icon size={20} className="flex-shrink-0"/>
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
                        <Image src="/communicate-logo.svg" alt="communicate-logo" width={20} height={20}/>
                        {!isSidebarCollapsed && <span className="ml-2">Aloqa</span>}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="bg-[#061626] px-6 py-4 flex items-center justify-between">
                    {/* Left side - Greeting */}
                    <div>
                        <h1 className="text-white text-xl font-semibold">
                            Salom {formatUserName(user?.first_name, user?.last_name)}
                        </h1>
                        <p className="text-gray-300 text-sm mt-1">
                            Shaxsiy kabinet orqali siz mukofotlarga oid barcha jarayonlarni boshqarishingiz mumkin
                        </p>
                    </div>

                    {/* Right side - Notifications and Avatar */}
                    <div className="flex items-center gap-4">
                        {/* Notifications Button */}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-white hover:bg-blue-800 p-2 rounded-lg relative"
                            onClick={() => router.push('/dashboard/notifications')}
                        >
                            <Bell size={20}/>
                            {unreadNotificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadNotificationCount}
                                </span>
                            )}
                        </Button>

                        {/* User Avatar Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 px-2 py-1 h-auto hover:bg-blue-800 rounded-lg transition-colors"
                                >
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage 
                                            src={user?.profile_picture || "/professional-woman-avatar.png"} 
                                            alt="User Avatar"
                                        />
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            {getUserInitials(user?.first_name, user?.last_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <ChevronDown className="w-4 h-4 text-white" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent 
                                align="end" 
                                className="w-64 bg-white border border-gray-200 shadow-lg rounded-lg"
                            >
                                {/* User Info Section */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage 
                                                src={user?.profile_picture || "/professional-woman-avatar.png"} 
                                                alt="User Avatar"
                                            />
                                            <AvatarFallback className="bg-blue-600 text-white text-lg">
                                                {getUserInitials(user?.first_name, user?.last_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {formatUserName(user?.first_name, user?.last_name)}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user?.email || user?.phone_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <DropdownMenuItem asChild>
                                        <Link 
                                            href="#" 
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                        >
                                            <User className="w-4 h-4" />
                                            My Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuSeparator className="bg-gray-100" />
                                    
                                    <DropdownMenuItem 
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50 focus:text-red-700"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto bg-[#061626]">{children}</main>
            </div>
        </div>
    </ProtectedRoute>
)
}