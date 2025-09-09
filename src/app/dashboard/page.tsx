"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Filter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const applications = [
  {
    id: "3456789874",
    service: '"Zulfiya mukofoti" olish uchun ariza yuborish',
    date: "16.06.2025",
    status: "Tayyorlandi",
    statusColor: "bg-green-500",
    source: "Mcompany ilovasi",
  },
  {
    id: "3456789875",
    service: "\"Mard o'g'lon\" davlat mukofoti",
    date: "26.06.2025",
    status: "Jarayonda",
    statusColor: "bg-orange-500",
    source: "Mcompany ilovasi",
  },
  {
    id: "3456789876",
    service: '"Mustaqillik" ordeni',
    date: "5.06.2025",
    status: "Rad etildi",
    statusColor: "bg-red-500",
    source: "Mcompany ilovasi",
  },
  {
    id: "3456789877",
    service: '"El-yurt hurmati" ordeni',
    date: "1.06.2025",
    status: "Tayyorlandi",
    statusColor: "bg-green-500",
    source: "Mcompany ilovasi",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user?.phone_number || 'Noma\'lum foydalanuvchi';
  };

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.phone_number?.slice(-2) || 'FU';
  };

  if (!user) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="bg-[#1e3a8a] rounded-xl p-6 border border-blue-800 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Foydalanuvchi ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="bg-[#1e3a8a] rounded-xl p-6 border border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-blue-600 text-white text-lg">
                <img src="/person-avatar.jpg" alt="Xasanova go'zal" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-medium">F.I.SH.</h3>
              <p className="text-blue-200 text-sm">
              Xasanova Go'zal O'ktam qizi
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-1">Telefon raqam</h3>
            <p className="text-blue-200 text-sm">+998 (94) 855 02 03</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">Pochta manzili</h3>
            <p className="text-blue-200 text-sm">xasanovagozal3@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <Card className="bg-[#1e3a8a] border-blue-800">
        <CardHeader className="border-b border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-2 rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-600"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="14,2 14,8 20,8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <CardTitle className="text-white text-xl">
              Mening Arizalarim
            </CardTitle>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                placeholder="Ariza raqami"
                className="bg-transparent border-blue-600 text-white placeholder:text-blue-300"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-blue-300" />
            </div>
            <div className="relative">
              <Input
                placeholder="Xizmat nomi"
                className="bg-transparent border-blue-600 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Sana(gacha)"
                type="date"
                className="bg-transparent border-blue-600 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="relative">
              <select className="w-full px-3 py-2 bg-transparent border-2 border-blue-600 rounded-md text-white">
                <option value="" className="bg-blue-800">Barcha holatlar</option>
                <option value="completed" className="bg-blue-800">Tayyorlandi</option>
                <option value="in-progress" className="bg-blue-800">Jarayonda</option>
                <option value="rejected" className="bg-blue-800">Rad etildi</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-blue-800 text-blue-200 text-sm font-medium">
            <div>Ariza raqami</div>
            <div>Xizmat nomi</div>
            <div>Yuborilgan sana</div>
            <div>Holati</div>
            <div>Manba</div>
          </div>

          {/* Table Rows */}
          {applications.map((app, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 p-4 border-b border-blue-800 hover:bg-blue-800/30 transition-colors"
            >
              <div className="text-blue-200 text-sm">{app.id}</div>
              <div className="text-white text-sm">{app.service}</div>
              <div className="text-blue-200 text-sm">{app.date}</div>
              <div>
                <Badge className={`${app.statusColor} text-white text-xs`}>
                  {app.status}
                </Badge>
              </div>
              <div className="text-blue-200 text-sm">{app.source}</div>
            </div>
          ))}

          {/* Empty State */}
          {applications.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-blue-300">Hozircha arizalar mavjud emas</p>
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                Yangi ariza berish
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}