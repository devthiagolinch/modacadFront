import { Footer } from "../shared/components/footer";
import { Header } from "../shared/components/header";


import { BlockText } from "../shared/components/blocktext";
import { useParams } from "react-router-dom";
import { CriarPerfil } from "../shared/components/criarPerfil";
import { useEffect, useState } from "react";
import { api } from "../shared/services/lib/axios";

interface Post {
    id: string;
    html: string;
    title: string;
    slug: string;
    tags: string[];
    feature_image: string;
    visibility: string;
    type: string;
    plaintext: string;
    admin_id: string
}

export function PilulasMCD() {
    const id = useParams<{id: string}>()
    const [pilula, setPilula] = useState<Post>();

    useEffect(() => {
        ;(async () => {
            await api.get(`/admins/texto/${id.id}`).then(({data}) => setPilula(data))
        })()
    }, [pilula]);
    console.log(pilula?.title)

    if(pilula?.visibility == "Pro") {
        return(
            <div className="overflow-hidden block">
                <CriarPerfil />
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full">

                    <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                            {pilula?.tags.map((tag) => (
                                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap 
                                    bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:100%_1em] bg-no-repeat bg-[position:calc(100%_-_var(--p,0%))_900%]  hover:bg-[position:100%_100%]
                                ">{tag.toUpperCase()}</span>
                            ))}
                        </div>
                        <div className="lg:flex lg:flex-col lg:pr-[20%] ">
                                <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                                    {pilula?.title}
                                </h1>

                                <p className="lg:text-left lg:text-[20px] w-[100%] font-montserratLight">
                                    {pilula?.slug}
                                </p>
                        </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={pilula?.admin_id} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">{pilula?.admin_id}</p>
                        </div>

                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                                <p className="text-left lg:mr-2">4/04/2025</p>
                                <span>•</span>
                                <span className="lg:ml-2">  10 min de leitura</span>
                            
                            <div className="lg:grid lg:items-end">
                            </div>

                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center bg-contain bg-center">
                        <div className="w-[280px] h-[280px] border-[1px] border-[#f1ece8] absolute ">
                        </div>
                        <img src={''}    className="w-[300px] h-[300px] object-cover " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-7 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-[40px] lg:text-[30px] leading-[40px] font-butler_ultra_light">
                            {pilula?.title}
                        </h1>

                        <p className="text-left leading-[20px] font-montserratLight">
                            {pilula?.slug}
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={''} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={pilula?.admin_id} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">{pilula?.admin_id}</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            {/* <div className="flex flex-col font-montserrat_light_italic">
                                {pilula?.tags.map((tag) => (
                                    <Link to={"/"} className="-mb-[5px]">{tags.toUpperCase()}</Link>
                                ))}
                            </div> */}

                            <div className="flex flex-col justify-between items-end">
                                <p className="text-left -mb-[5px]">4/04/2025</p>
                                <span>10 min de leitura</span>
                            </div>

                        </div>

                    </div>
                    
                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]  ">
                    <p className="lg:text-justify lg:text-lg font-montserrat_light">
                        {pilula?.html}
                    </p>

                </div>
                <Footer />                
            </div>
        )
    }else{
        return(
            <div className="mx-auto h-screen">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full">

                    <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                            {/* {pilula?.tags.map((tag) => (
                                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">{tags.toUpperCase()}</span>
                            ))} */}
                        </div>
                        <div className="lg:flex lg:flex-col lg:pr-[20%] ">
                                <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                                    {pilula?.title}
                                </h1>

                                <p className="lg:text-left lg:text-[20px] w-[100%] font-montserratLight">
                                    {pilula?.slug}
                                </p>
                        </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={pilula?.admin_id} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">{pilula?.admin_id}</p>
                        </div>

                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                                <p className="text-left lg:mr-2">4/04/2025</p>
                                <span>•</span>
                                <span className="lg:ml-2">  10 min de leitura</span>
                            
                            <div className="lg:grid lg:items-end">
                            </div>

                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center bg-contain bg-center">
                        <div className="w-[280px] h-[280px] border-[1px] border-[#f1ece8] absolute ">
                        </div>
                        <img src={''}    className="w-[300px] h-[300px] object-cover " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-7 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            {pilula?.title}
                        </h1>

                        <p className="text-left leading-[20px] font-montserratLight">
                            {pilula?.slug}
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={''} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={pilula?.admin_id} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">{pilula?.admin_id}</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            <div className="flex flex-col font-montserrat_light_italic">
                                {/* {pilula?.tags.map((tag) => (
                                    <Link to={"/"} className="-mb-[5px]">{tags.toUpperCase()}</Link>
                                ))} */}
                            </div>

                            <div className="flex flex-col justify-between items-end">
                                <p className="text-left -mb-[5px]">4/04/2025</p>
                                <span>10 min de leitura</span>
                            </div>

                        </div>

                    </div>
                    
                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]  ">
                    <p className="lg:text-justify lg:text-lg font-montserrat_light lg:h-40 h-48 overflow-hidden">
                        {pilula?.html}
                    </p>

                </div>
                <BlockText />
                <Footer />                
            </div>
        )
    }
    
}