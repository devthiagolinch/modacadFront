
import { ServiceData } from "../assets/utils/constants.index";
import banner from "../assets/imgs/camila.jpg"

export function BlanckPage(id: string) {
    const texto = ServiceData.find((text) => text.id == "1");
    console.log(texto)

    return(
        <div className="flex flex-col gap-10 px-[5px] justify-center items-center">
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

            
        </div>
    )
}