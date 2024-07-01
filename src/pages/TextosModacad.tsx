import { Footer } from "../components/footer";
import { Header } from "../components/header";


import { BlockText } from "../components/blocktext";
import { useParams } from "react-router-dom";
import { ServiceData } from "../assets/utils/constants.index";


export function TextosModacad() {
    const params = useParams<{textId: string}>();
    const text = ServiceData.find((text) => text.id == params.textId);
    
    const show = "false"

    if(show) {
        return(
            <div className="mx-auto">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full">

                    <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                            {text?.tag.map((tag) => (
                                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">{tag.toUpperCase()}</span>
                            ))}
                        </div>
                        <div className="lg:flex lg:flex-col lg:pr-[20%] ">
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

                    <div className="flex justify-center items-center pl-[20px]">
                        <div className="lg:h-[370px] lg:w-[730px] border-[1px] border-[#f1ece8] absolute ">

                        </div>
                        <img src={text?.backgroundImage} alt="" className="lg:h-[400px] lg:w-[760px] object-cover" />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-16 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            {text?.title}
                        </h1>

                        <p className="text-left leading-[20px]">
                            {text?.description}
                        </p>
                    </div>

                    <div className="flex flex-col ">
                        <div className="flex w-full justify-center items-center">
                            <div className="w-[95%] h-[180px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={text?.backgroundImage} alt="" className="max-h-[200px] w-[100%]
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
                {text?.tag.map((tag) => (
                <span className="-mb-[5px] text-[13px]">{tag.toUpperCase()}</span>
                ))}
                </div>

                <div className="flex flex-col justify-between items-end">
                <p className="text-left -mb-[5px]">4/04/2025</p>
                <span>10 min de leitura</span>
                </div>

                </div>

                </div>

                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]">
                <p className="lg:text-justify lg:text-lg font-montserrat_light">
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
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                            {text?.tag.map((tag) => (
                                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">{tag.toUpperCase()}</span>
                            ))}
                        </div>
                        <div className="lg:flex lg:flex-col lg:pr-[20%] ">
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

                    <div className="flex justify-center items-center pl-[20px]">
                        <div className="lg:h-[370px] lg:w-[730px] border-[1px] border-[#f1ece8] absolute ">

                        </div>
                        <img src={text?.backgroundImage} alt="" className="lg:h-[400px] lg:w-[760px] object-cover" />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-16 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            {text?.title}
                        </h1>

                        <p className="text-left leading-[20px]">
                            {text?.description}
                        </p>
                    </div>

                    <div className="flex flex-col ">
                        <div className="flex w-full justify-center items-center">
                            <div className="w-[95%] h-[180px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={text?.backgroundImage} alt="" className="max-h-[200px] w-[100%]
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
                                {text?.tag.map((tag) => (
                                    <span className="-mb-[5px] text-[13px]">{tag.toUpperCase()}</span>
                                ))}
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