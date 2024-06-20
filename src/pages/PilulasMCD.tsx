import { Footer } from "../components/footer";
import { Header } from "../components/header";


import { BlockText } from "../components/blocktext";
import { useParams } from "react-router-dom";
import { ServiceData } from "../assets/utils/constants.index";

import avatar from "../assets/imgs/telma.jpeg"


export function PilulasMCD() {
    const params = useParams<{pilulaId: string}>();
    const text = ServiceData.find((text) => text.id == params.pilulaId);
    
    const show = "true"

    if(!show) {
        return(
            <div className="mx-auto">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full lg:pt-[60px]">
                    <div className="lg:flex  lg:pb-5 lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto lg:mr-[105px]">
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">HISTORIO DA MODA</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">NOVOS MATERIAIS</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">MODA URBANA</span>
                        </div>
                    <div className="lg:flex lg:flex-col lg:pr-[20%] lg:ml-[94px]">
                            <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                            {text?.title}

                            </h1>

                            <p className="lg:text-left lg:text-[20px] w-[100%] lg:font-montserrat_regular">
                                {text?.description}
                            </p>
                    </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={avatar} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">{text?.author}</p>
                        </div>

                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                                <p className="text-left lg:mr-2">4/04/2025</p>
                                <span>•</span>
                                <span className="lg:ml-2">  10 min de leitura</span>
                            
                            <div className="lg:grid lg:items-end">
                            </div>

                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <div className="w-[280px] h-[280px] border-[1px] border-[#f1ece8] absolute ">

                        </div>
                        <img src={text?.backgroundImage} alt="" className="w-[300px] h-[300px] " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-28 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            {text?.title}
                        </h1>

                        <p className="text-left leading-[20px]">
                            {text?.description}
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        {/* borda sera interna - com espaço de 10px entre a borda real da imagem e a desenhada
                            ajustar para a imagem do text?.backgroundImage mesmo sendo retangular ficar com altura maxima e cortada
                            para o centro
                        */}
                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={text?.backgroundImage} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={avatar} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">Telma Barcellos</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            <div className="flex flex-col font-montserrat_light_italic">
                                <span className="-mb-[5px]">Historia da Moda</span>
                                <span className="-mb-[5px]">Novos Materiais</span>
                                <span>Moda Urbana</span>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                                <p className="text-left -mb-[5px]">4/04/2025</p>
                                <span>10 min de leitura</span>
                            </div>

                        </div>

                    </div>
                    
                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]">
                    <p className="text-justify  lg:text-lg font-montserrat_regular">
                        {text?.text}
                    </p>

                </div>
                <Footer />                
            </div>
        )
    }else{
        return(
            <div className="mx-auto">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full">

                    <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                            {text?.tag.map((tag) => (
                                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">{tag.toUpperCase()}</span>
                            ))}
                        </div>
                        <div className="lg:flex lg:flex-col lg:pr-[20%] ">
                                <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                                    {text?.title}
                                </h1>

                                <p className="lg:text-left lg:text-[20px] w-[100%] font-montserratLight">
                                    {text?.description}
                                </p>
                        </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={text?.authorAvatar} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">{text?.author}</p>
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
                        <img src={text?.backgroundImage}    className="w-[300px] h-[300px] object-cover " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-7 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            {text?.title}
                        </h1>

                        <p className="text-left leading-[20px] font-montserratLight">
                            {text?.description}
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={text?.backgroundImage} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={text?.authorAvatar} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">{text?.author}</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            <div className="flex flex-col font-montserrat_light_italic">
                                <span className="-mb-[5px]">Historia da Moda</span>
                                <span className="-mb-[5px]">Novos Materiais</span>
                                <span>Moda Urbana</span>
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
                        {text?.text}
                    </p>

                </div>
                <BlockText />
                <Footer />                
            </div>
        )
    }
    
}