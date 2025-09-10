"use client"

import {useEffect, useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import ServiceModal from "@/app/components/dashboard/ServiceModal"
import {useAuth} from "@/context/AuthContext";
import api from "@/lib/api";
import Image from "next/image";

interface Rewards {
    id: number;
    name: string;
    description: string;
    image: string;
    applications_count: number;
    created_at: string; // or Date if you want to parse it
    title: string;
}

export default function ServicesPage() {
    const {user} = useAuth()
    const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [services, setServices] = useState<Rewards[]>([])

    const handleServiceClick = (service: (typeof services)[0]) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    const getServices = async () => {
        const {data} = await api.get<{ rewards: Rewards[] }>('applications/rewards')
        setServices(data.rewards)
    }

    useEffect(() => {
        getServices()
    }, []);

    return (
        <div className="flex-1 p-6 bg-[#002B5C] min-h-screen">
            {/* User Profile Section */}
            <div className="bg-[#1e40af] rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                        <Image src={user?.profile_picture || ''} alt="User Avatar"
                               className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-white font-semibold mb-1">F.I.SH.</h3>
                            <p className="text-blue-200 text-sm">{user?.first_name} {user?.last_name}</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Telefon raqam</h3>
                            <p className="text-blue-200 text-sm">{user?.phone_number}</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Pochta manzili</h3>
                            <p className="text-blue-200 text-sm">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Title */}
            <h1 className="text-white text-2xl font-bold mb-6">Xizmatlar</h1>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                    <Card key={service.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-[76px] h-[126px] mb-4 flex items-center justify-center">
                                <Image
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.image || ''}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-gray-800 font-medium mb-4 text-sm leading-tight">{service?.title}</h3>
                            <div className='flex w-full cursor-pointer'
                                 onClick={() => handleServiceClick(service)}>
                                <span
                                    className='text-[#002B5C] w-full pl-4 flex items-center border rounded-tl-md rounded-bl-md'>Batafsil</span>
                                <Button
                                    className="bg-[#002B5C] hover:bg-[#001a3d] text-white  mt-auto rounded-tl-none rounded-bl-none w-24"
                                    size="sm"
                                >
                                    <ArrowRight className="w-4 h-4 ml-2"/>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <ServiceModal isOpen={isModalOpen} onClose={handleCloseModal} service={selectedService}/>
        </div>
    )
}
