import { Link } from "react-router-dom"
import { ServiceData } from "../assets/utils/constants.index"

export function LastPost() {
    const lastPost = ServiceData.at(-1)

    return(
        <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px]">
            <div className="flex items-center border-r-[1px] border-[#202020]">
                <p className="transform: -rotate-90 font-medium text-xs text-nowrap w-8 p-4 lg:w-20">Último Texto</p>
            </div>

            {/** DESKTOP */}
            <Link to={`/textomodacad/${lastPost?.id}`} className="hidden lg:flex lg:gap-10">
                <div className="flex flex-col w-full gap-4 lg:w-[44%] lg:p-10">
                    {lastPost?.tag.map((t) => (
                        <span className="font-montserratLight text-[12px] -mt-[15px] ">{t}</span>
                    ))}

                    <h1 className="text-xl lg:text-6xl">
                        {lastPost?.title}
                    </h1>

                    <p className="text-xs lg:text-lg text-justify w-[90%]">
                        {lastPost?.description}
                    </p>
                </div>

                <div className=" lg:w-[60%] shadow-inner bg-green-400">
                    <img src={lastPost?.backgroundImage} className="h-full object-cover object-top sm:h-full" />
                </div>
            </Link>
            {/** MOBILE */}
            <Link to={`/textomodacad/${lastPost?.id}`} className="flex flex-col lg:hidden ">
                <div className="shadow-inner bg-green-400">
                    <img src={lastPost?.backgroundImage} className="h-full object-cover object-top sm:h-full" />
                </div>
                <div className="flex flex-col w-full p-3">
                    {lastPost?.tag.map((t) => (
                        <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>
                    ))}

                    <h1 className="text-xl lg:text-6xl">
                        {lastPost?.title}
                    </h1>

                    <p className="text-xs lg:text-lg text-left w-[90%]">
                        {lastPost?.description}
                    </p>
                </div>
            </Link>            
        </div>
    )
}