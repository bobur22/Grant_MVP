"use client"

import {ProtectedRoute} from "@/components/ProtectedRoute";
import React, {useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter} from "next/navigation";

interface Props {
    params: { id: string }
}

interface IApplicationDetails {
    ariza_raqami: number;
    xizmat_nomi: string;
    holati: string;
    holati_code: string;
    manba: string;
    xizmat_rasmi: string;

    shaxsiy_malumotlar: {
        ism: string;
        familiya: string;
        pinfl: string;
        telefon: string;
        hudud: string;
        tuman: string;
        mahalla: string;
    };

    faoliyat_malumotlari: {
        faoliyat_sohasi: string;
        faoliyat_haqida: string;
    };

    hujjatlar: {
        tavsiya_xati: {
            mavjud: boolean;
            fayl_url: string | null;
            fayl_nomi: string | null;
        };
        sertifikatlar: {
            id: number;
            fayl_nomi: string;
            fayl_url: string;
            yuklangan_vaqt: string; // ISO string or custom datetime
        }[];
    };

    vaqtlar: {
        yuborilgan: string;   // "09.09.2025 17:56"
        yangilangan: string;  // "09.09.2025 17:56"
    };
}




export default function ApplicationDetail({params}: Props) {
    const [detail, setDetail] = useState<IApplicationDetails>();
    const {id} = React.use(params);


    const getApplicationDetails = async () => {
        const {data} = await api.get<{ data: IApplicationDetails }>(`applications/applications/${id}/`);
        setDetail(data.data)
    }

     const generateImage = (url: string | undefined): string => {
        return `https://grand-production.up.railway.app${url}`
    }


    useEffect(() => {
        getApplicationDetails()
    }, [])

    return (
        <ProtectedRoute>

            <div className="bg-[#1e3a8a] rounded-xl p-6 border border-blue-800">
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-6'>
                        <div className='w-[100px] h-[100px] bg-white rounded-full overflow-hidden'>
                            <img src={generateImage(detail?.xizmat_rasmi)} alt="zulfiya" className='w-full h-full object-cover'/>
                        </div>
                        <p className='text-[18px] text-white font-medium'>{detail?.xizmat_nomi}</p>
                    </div>
                    <span className='text-[18px] text-white font-medium'>{detail?.vaqtlar.yuborilgan}</span>
                </div>
                <div className="grid grid-cols-12 gap-y-12 px-8">
                    <div className="col-span-6 text-[20px] text-white">F.I.SH</div>
                    <div
                        className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.familiya} {detail?.shaxsiy_malumotlar.ism}</div>
                    <div className="col-span-6 text-[20px] text-white">JSHSHIR</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.pinfl || ' - '}</div>
                    <div className="col-span-6 text-[20px] text-white">Hudud</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.hudud}</div>
                    <div className="col-span-6 text-[20px] text-white">Tuman</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.tuman}</div>
                    <div className="col-span-6 text-[20px] text-white">Mahalla</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.mahalla}</div>
                    <div className="col-span-6 text-[20px] text-white">Telefon raqam</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.telefon}</div>
                    <div className="col-span-6 text-[20px] text-white">Naminatsiya turi</div>
                    <div className="col-span-6 text-[20px] text-white">{detail?.shaxsiy_malumotlar.hudud}</div>
                    <div className="col-span-6 text-[20px] text-white">Faoliyat sohasi</div>
                    <div
                        className="col-span-6 text-[20px] text-white">{detail?.faoliyat_malumotlari.faoliyat_sohasi}</div>
                    <div className="col-span-6 text-[20px] text-white">Faoliyat haqida</div>
                    <div
                        className="col-span-6 text-[20px] text-white">{detail?.faoliyat_malumotlari.faoliyat_haqida}</div>
                    {
                        detail?.hujjatlar.tavsiya_xati.mavjud && (
                            <>
                                <div className="col-span-6 text-[20px] text-white">Tavsiya xati</div>
                                <a className='col-span-6 text-[20px] text-white'
                                   href={detail?.hujjatlar.tavsiya_xati.fayl_url}>{detail?.hujjatlar.tavsiya_xati.fayl_nomi}</a>
                            </>
                        )
                    }

                    {
                        detail?.hujjatlar.sertifikatlar.length > 0 && (
                            <>
                                <div className="col-span-6 text-[20px] text-white">Sertifikatlar</div>
                                <div className="col-span-6 text-[20px] text-white flex flex-col gap-2">
                                    {detail?.hujjatlar.sertifikatlar.map(item => {
                                        return (
                                            <a href={item.fayl_url} key={item.id}>{item.fayl_nomi}</a>
                                        );
                                    })}
                                </div>
                            </>
                        )
                    }


                    {/*<div className="col-span-6 text-[20px] text-white">Foto</div>*/}
                    {/*<div className="col-span-6 text-[20px] text-white">{detail?.hujjatlar.sertifikatlar.fayl_nomi}</div>*/}
                </div>

            </div>
        </ProtectedRoute>
    )
}