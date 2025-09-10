"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthModal } from "../AuthModal/AuthModal"
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

const navigationItems = [
  { name: "Asosiy", href: "/" },
  { name: "Biz haqimizda", href: "/about" },
  { name: "Mukofotlar", href: "/awards" },
  { name: "Yo&apos;riqnomalar", href: "/guidelines" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const {user} = useAuth()
  const router = useRouter()

  const openLoginModal = () => {
    ['', null, undefined].includes(user?.id) ? setIsAuthModalOpen(true) : router.push('/dashboard')
  }

  return (
    <>
    <nav className="bg-[#1e3a5f] border-b border-[#2a4a6b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="bg-white h-8 w-24 rounded"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Language selector and Cabinet button */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-orange-400 hover:bg-[#2a4a6b] flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>o&apos;zbek</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>o&apos;zbek</DropdownMenuItem>
                <DropdownMenuItem>Русский</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
              onClick={() => openLoginModal()}
            >
              Kabinet
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-orange-400 hover:bg-[#2a4a6b]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1e3a5f] border-l border-[#2a4a6b]">
              <SheetTitle className="sr-only">Hidden Title</SheetTitle>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-orange-400 px-3 py-2 text-lg font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}

                  <div className="border-t border-[#2a4a6b] pt-4 mt-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-white hover:text-orange-400 hover:bg-[#2a4a6b] flex items-center space-x-2 w-full justify-start"
                        >
                          <Globe className="h-4 w-4" />
                          <span>o&apos;zbek</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-white">
                        <DropdownMenuItem>o&apos;zbek</DropdownMenuItem>
                        <DropdownMenuItem>Русский</DropdownMenuItem>
                        <DropdownMenuItem>English</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium w-full mt-4"
                      onClick={() => {
                        setIsOpen(false)
                        setIsAuthModalOpen(true)
                      }}
                      >
                      Kabinet
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
     <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
  </>
  )
}
