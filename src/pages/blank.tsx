
import { ServiceData } from "../assets/utils/constants.index";
import banner from "../assets/imgs/camila.jpg"
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

import { newBlogAPI } from "../lib/axios";

interface Subjects {
    id: string,
    name: string
}

export function BlanckPage() {
    const texto = ServiceData.find((text) => text.id == "1");

    
    const [subjects, setSubjects] = useState<Subjects[]>([])
    

    useEffect(() => {
      newBlogAPI.get('/subjects').then(response => setSubjects(response.data))
    }, [])

    return(
        <div className="flex flex-col gap-10 px-[5px] py-[10px] justify-center items-center bg-gray-700">
            {/** texto modacad card */}
            <div className="">
                <div className=" border-[1px] border-[#202020]">
                    <img src={texto?.backgroundImage} alt="" className="h-[150px] w-full object-cover" />
                </div>

                <div className="border-t-0 border-[1px] border-[#202020]
                    p-[10px]
                ">
                    {texto?.tag.map((t) => (
                            <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>
                        ))}

                    <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[5px]">
                        {texto?.title}
                    </h1>

                    <p className="font-montserratRegular text-[17px] leading-[20px]">
                        {texto?.description}
                    </p>
                </div>
            </div>
            <div className="">
                <div className=" border-[1px] border-[#202020]">
                    <img src={banner} alt="" className="h-[150px] w-full object-cover" />
                </div>

                <div className="border-t-0 border-[1px] border-[#202020]
                    p-[10px]
                ">
                    <span className="font-montserratMedium text-[15px]">Tendencias</span>

                    <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[5px]">
                        The art g of creative problem-solving
                        The art of creative
                    </h1>

                    <p className="font-montserratRegular text-[17px] leading-[20px]">
                    Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado.
                    </p>
                </div>
            </div>

            {/** pilulas modacad card */}

            <div className="flex w-[100%] gap-[5px]">
                <div className="w-[172px] border-[1px] border-[#202020]
                
                ">
                    <div>
                        <img src={banner} alt="" className="h-[150px] object-cover" />
                    </div>
        
                    <div className="p-[10px]">
                        <div className="grid">                            
                            <span className="font-montserratLight text-[12px]">Tendencias</span>
                            <span className="font-montserratLight text-[12px] -mt-[5px]">Tendencias</span>
                            <span className="font-montserratLight text-[12px] -mt-[5px]">Tendencias</span>
                        </div>
        
                        <h1 className="text-[16px] font-butler_bold leading-[20px] mb-[10px] mt-[8px]">
                            The art g of creative problem-solving
                            The art of creative
                        </h1>
        
                        <p className="text-[14px] font-montserratRegular leading-[15px]">
                        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado.
                        </p>
                    </div>
                </div>

                <div className="w-[172px] border-[1px] border-[#202020]
                
                ">
                    <div>
                        <img src={banner} alt="" className="h-[150px] object-cover" />
                    </div>
        
                    <div className="p-[10px]">
                        <div className="grid">                            
                            <span className="font-montserratLight text-[12px]">Tendencias</span>
                            <span className="font-montserratLight text-[12px] -mt-[5px]">Tendencias</span>
                            <span className="font-montserratLight text-[12px] -mt-[5px]">Tendencias</span>
                        </div>
        
                        <h1 className="text-[16px] font-butler_bold leading-[20px] mb-[10px] mt-[8px]">
                            The art g of creative problem-solving
                            The art of creative
                        </h1>
        
                        <p className="text-[14px] font-montserratRegular leading-[15px]">
                        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado.
                        </p>
                    </div>
                </div>
            </div>
    

            {/* CARDS FLUTUANTES */}

            <div className="bg-[#f1ece8] p-[10px] w-[80%] min-w-[320px] max-w-[500px] absolute">
                <div className="border-[1px] border-[#202020] flex flex-col justify-center items-center p-[20px]">
                        <div className="font-butler_ultra_light text-[25px] w-full min-h-[30px] flex justify-center items-center mb-[20px]">
                            Seu Perfil
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <form action="" method="post" className=" mb-[20px] px-3 min-w-[100%] md:min-w-[50%] md:max-w-[70%]">
                                <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserratLight
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                                    invalid:border-pink-500 invalid:text-pink-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                "/>
                                <input type="email" placeholder="Seu nome" className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserrat_light_italic
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                "/>
                                <input type="email" placeholder="Sua senha" className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserrat_light_italic
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                "/>
                                <input type="email" placeholder="Repita sua senha" className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserrat_light_italic
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                "/>
                            </form>
                            <Button title={"Enviar"} active={true} />
                        </div>
                </div>
            </div>

            <ul>
                {subjects.map((sub) => {
                    return (
                        <li key={sub.id}>{sub.name}</li>
                    )
                })
                }
            </ul>
            
        </div>
    )
}