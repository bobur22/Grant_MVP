"use client"

import React from "react"
import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {FileText, Grid3X3, Scale, HelpCircle, BookOpen, History, Menu, X,  Bell} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useAuth} from "@/context/AuthContext"
import {ProtectedRoute} from "@/components/ProtectedRoute"
import Image from "next/image";
import api from "@/lib/api"
import { useRouter } from "next/navigation"

const menuItems = [
    {href: "/dashboard", label: "Mening Arizalarim", icon: FileText},
    {href: "/dashboard/services", label: "Xizmatlar & Ariza berish", icon: Grid3X3},
    {href: "/dashboard/legal", label: "Huquqiy Savollar", icon: Scale},
    {href: "/dashboard/faq", label: "FAQ", icon: HelpCircle},
    {href: "/dashboard/guides", label: "Yo'riqnomalar", icon: BookOpen},
    {href: "/dashboard/history", label: "Amaliyotlar tarixi", icon: History},
]

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const pathname = usePathname()
    const {user} = useAuth()
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();
    
    // Stats olish uchun useEffect qo'shing:
    useEffect(() => {
        const fetchNotificationStats = async () => {
            try {
                const response = await api.get('/notifications/stats/');
                setUnreadCount(response.data.unread_count);
            } catch (error) {
                console.error('Failed to fetch notification stats:', error);
            }
        };
    
        if (user) {
            fetchNotificationStats();
        }
    }, [user]);
    
    // unreadCount ni global context yoki prop sifatida boshqarish uchun funksiya:
    const updateUnreadCount = (newCount: number) => {
        setUnreadCount(newCount);
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
                                Salom {user?.first_name + ' ' + user?.last_name}
                            </h1>
                            <p className="text-gray-300 text-sm mt-1">
                                Shaxsiy kabinet orqali siz mukofotlarga oid barcha jarayonlarni boshqarishingiz mumkin
                            </p>
                        </div>

                        {/* Right side - Notifications and Avatar */}
                        <div className="flex items-center gap-4">
                        <Button 
    variant="ghost" 
    size="sm" 
    className="text-white hover:bg-blue-800 p-2 rounded-lg relative"
    onClick={() => router.push('/dashboard/notifications')}
>
    <Bell size={20}/>
    {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
        </span>
    )}
</Button>
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="/professional-woman-avatar.png" alt="User Avatar"/>
                                <AvatarFallback className="bg-blue-600 text-white">
                                    <Image src={user?.profile_picture || ''} alt="Xasanova Go'zal" width={100} height={100}/>
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