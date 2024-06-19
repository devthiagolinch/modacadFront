import { Footer } from "../components/footer";
import { Header } from "../components/header";

import telma from "../assets/imgs/telma.jpeg"
import { TextoPremium } from "../components/textoPremium";
import { useParams } from "react-router-dom";

import { ServiceData } from "../assets/utils/constants.index";

export function TextosModacad() {
    const params = useParams<{textId: string}>();
    const text = ServiceData.find((text) => text.id == params.textId);

    return(
        <div className="mx-auto">
            <Header />
            {/* DESKTOP */}
            <div className="hidden lg:flex lg:flex-col  lg:w-full lg:pt-[60px]">
                <div className="lg:flex  lg:pb-5 lg:gap-[3%] lg:justify-between">
                    
                    <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                        <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">HISTORIO DA MODA</span>
                        <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">NOVOS MATERIAIS</span>
                        <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">MODA URBANA</span>
                    </div>
                   <div className="lg:flex lg:flex-col lg:pr-[20%] lg:ml-[94px]">
                        <h1 className="lg:text-7xl font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                            {text?.title}
                        </h1>

                        <p className="lg:text-left lg:text-[20px] w-[100%] lg:font-montserrat_regular">
                        {text?.description} 
                        </p>
                   </div>
                </div>    

                <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                    <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                        <img src={telma} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                        <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">Telma Barcellos</p>
                    </div>

                    <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                            <p className="text-left lg:mr-2">4/04/2025</p>
                            <span>•</span>
                            <span className="lg:ml-2">  10 min de leitura</span>
                        
                        <div className="lg:grid lg:items-end">
                        </div>

                    </div>
                </div>

                <div className="lg:flex lg:w-full lg:justify-center lg:items-center">
                    <img src={text?.backgroundImage} alt="" className="lg:h-[50%] lg:max-w-[60%]" />
                </div>
                
            </div>
             {/* MOBILE */}
            <div className="lg:hidden">
                <div className=" pt-28 pb-5 w-full px-5 grid gap-5">
                    <h1 className="text-3xl font-butler_ultra_light">
                        Estilismo pelo mundo Tokio
                        Outono Inverno 2024 2025
                    </h1>

                    <p className="text-left">
                    Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                    e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                    de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                    </p>
                </div>

                <div>
                    <div className="flex w-full justify-center items-center">
                        <img src={text?.backgroundImage} alt="" className="h-[50%] max-w-[100%]" />
                    </div>

                    <div className="flex p-5 gap-5 items-center">
                        <img src={telma} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                        <p>Telma Barcellos</p>
                    </div>

                    <div className="flex justify-between items-center gap-10 px-5 text-zinc-800">
                        <div className="flex flex-col">
                            <span>tags</span>
                            <span>tags</span>
                            <span>tags</span>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p className="text-left">4/04/2025</p>
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
            <TextoPremium />

            <Footer />
        </div>
    )
}
