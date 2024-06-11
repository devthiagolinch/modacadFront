import setaCurvaIcon from "../assets/icons/seta-curva.svg";
import facebookicon from "../assets/icons/social  media/facebook.svg"
import tiktokIcon from "../assets/icons/social  media/tiktok.svg"
import pinterestIcon from "../assets/icons/social  media/pinterest.svg"
import linkedinIcon from "../assets/icons/social  media/linkedin.svg"
import instaIcon from "../assets/icons/social  media/instagram.svg"
import youtubeIcon from "../assets/icons/social  media/youtube.svg"
import emailIcon from "../assets/icons/email.svg";
import wppIcon from "../assets/icons/whatsapp.svg"
import { ReadingBox } from "./reagindBox";


export function Footer() {
    // ícones 29x29px
    // box 90xz60px

    return (
        <div className="grid">
            {/** MUDAR A COR DOS ÍCONES PARA #202020 */}
            <div className="
                flex flex-col lg:flex-row md:justify-around md:w-full 
                border-[1px] border-zinc-900 md:items-center
            ">

                {/** MOBILE */}
                <div className="flex justify-start items-center px-[20px] mt-[30px] mb-[35px] lg:hidden">
                    <p className="text-[40px] font-butler_ultra_light md:text-7xl leading-[40px]">Nossas <br /> redes sociais</p>
                    <img src={setaCurvaIcon} alt="" className=" max-h-[40px] transform: -scale-x-90 rotate-[216deg]" />
                </div>

                {/** DESKTOP */}
                <div className="hidden lg:flex justify-start items-center px-[20px] mt-[30px] mb-[35px] ">
                    <div>
                        <p className="text-[40px] font-butler_ultra_light md:text-7xl leading-[40px]">Nossas <br /> redes sociais</p>
                    </div>
                    <img src={setaCurvaIcon} alt="" className=" max-h-[40px]" />
                </div>
                
                <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:my-10 h-auto px-[20px] mb-[40px]
                ">

                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                        <img src={linkedinIcon} className=" md:h-[50px]" />
                    </div>
                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                        <img src={pinterestIcon} className="md:h-[50px] " />
                    </div>
                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                        
                    <img src={instaIcon} className="md:h-[50px] " />
                    </div>
                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                    <img src={tiktokIcon} className="md:h-[50px] h-[30px]" />
                    </div>
                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                    <img src={youtubeIcon} className="md:h-[50px] " />
                    </div>
                    <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-full h-[60px]
                        border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                    ">
                    <img src={facebookicon} className="md:h-[50px] " />
                    </div>
                

                </div>

                        
            </div>

            <ReadingBox />

            <div className="
                w-full  px-[20px] py-[30px] lg:flex lg:flex-col lg:justify-center lg:items-start lg:px-[10%]
                border-t-[1px] border-b-[1px] border-[#202020]
            ">
                <h1 className="font-butler_ultra_light text-[40px] mb-[30px] leading-[40px]">Quer falar comigo?</h1>

                <ul className="flex flex-col gap-7">
                    <li className="flex gap-2 font-montserrat_medium">
                        <img src={emailIcon} alt="" className="max-w-[24px] " />
                        telmabarcellos@modacad.com.br
                    </li>
                    <li className="flex gap-2 font-montserrat_medium">
                        <img src={wppIcon} alt="" className="max-h-[24px]" />
                        31 99616 7573
                    </li>
                </ul>
            </div>
            <span className="px-[20px] py-1 text-[14px]">Copyright 2024 Modacad</span>

        </div>
       
    )
}