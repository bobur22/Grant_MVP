"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import React, {useEffect, useState} from "react";
import api from "@/lib/api";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import Image from "next/image";

export interface RewardResponse {
    id: number;
    reward: Reward;
    user: User;
    status: string;
    status_display: string;
    area: string;
    area_display: string;
    district: string;
    neighborhood: string;
    activity: string;
    activity_description: string;
    recommendation_letter: string;
    source: string;
    certificates: Certificate[];
    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime
}

export interface Reward {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: string; // ISO datetime
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface Certificate {
    // Empty now, but define fields if API returns more later
}

export interface Pagination {
    "current_page": number,
    "total_pages": number,
    "total_count": number,
    "has_next": boolean,
    "has_previous": boolean,
    "page_size": number
}

interface Status {
    label: string;
    color: string;
}

type StatusKey =
    | "yuborilgan"
    | "mahalla"
    | "tuman"
    | "hudud"
    | "oxirgi_tasdiqlash"
    | "mukofotlangan"
    | "rad_etilgan";


export default function DashboardPage() {
    const {user} = useAuth();
    const router = useRouter()

    const [applications, setApplications] = useState<RewardResponse[]>([])
    const statuses: Record<StatusKey, Status> = {
        yuborilgan: {
            label: "Yuborilgan",
            color: "text-green-600", // sent
        },
        mahalla: {
            label: "Mahalla jarayonida",
            color: "text-yellow-700", // in process
        },
        tuman: {
            label: "Tuman",
            color: "text-indigo-700", // district
        },
        hudud: {
            label: "Hudud",
            color: "text-purple-700", // region
        },
        oxirgi_tasdiqlash: {
            label: "Oxirgi tasdiqlash",
            color: "text-teal-700", // final approval
        },
        mukofotlangan: {
            label: "Mukofotlangan",
            color: "text-green-700", // rewarded
        },
        rad_etilgan: {
            label: "Rad etilgan",
            color: "text-red-700", // rejected
        },
    }

    const getApplicationList = async () => {
        const {data} = await api.get<RewardResponse[]>('/applications/my-applications/')
        setApplications(data)
    }


    const openDetails = (id: number)=> {
        router.push(`dashboard/application-detail/${id}`)
    }

    useEffect(() => {
        getApplicationList()
    }, []);


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
                            <AvatarImage src="/placeholder.svg?height=80&width=80"/>
                            <AvatarFallback className="bg-blue-600 text-white text-lg">
                                <Image src={user.profile_picture || ''} alt="Xasanova go'zal" width={100} height={100}/>
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-white font-medium">F.I.SH.</h3>
                            <p className="text-blue-200 text-sm">
                                {user.first_name} {user.last_name}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-1">Telefon raqam</h3>
                        <p className="text-blue-200 text-sm">{user.phone_number}</p>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-1">Pochta manzili</h3>
                        <p className="text-blue-200 text-sm">{user.email}</p>
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
                            <Search className="absolute right-3 top-3 w-4 h-4 text-blue-300"/>
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
                            <select
                                className="w-full px-3 py-2 bg-transparent border-2 border-blue-600 rounded-md text-white">
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
                    <div
                        className="grid grid-cols-5 gap-4 p-4 border-b border-blue-800 text-blue-200 text-sm font-medium">
                        <div>Ariza raqami</div>
                        <div>Xizmat nomi</div>
                        <div>Yuborilgan sana</div>
                        <div>Holati</div>
                        <div>Manba</div>
                    </div>

                    {/* Table Rows */}
                    {applications.map((app, index) => (
                        <div
                            onClick={() => openDetails(app.id)}
                            key={index}
                            className="cursor-pointer grid grid-cols-5 gap-4 p-4 border-b border-blue-800 hover:bg-blue-800/30 transition-colors"
                        >
                            <div className="text-blue-200 text-sm">{app.id}</div>
                            <div className="text-white text-sm">{app.reward.name}</div>
                            <div className="text-blue-200 text-sm">{app.created_at}</div>
                            <div className={cn(statuses[app.status as StatusKey].color)}>
                                {app.status_display}
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