import setaCurvaIcon from "../assets/icons/seta-curva.svg";
import facebookicon from "../assets/icons/social  media/facebook.svg"
import tiktokIcon from "../assets/icons/social  media/tiktok.svg"
import pinterestIcon from "../assets/icons/social  media/pinterest.svg"
import linkedinIcon from "../assets/icons/social  media/linkedin.svg"
import instaIcon from "../assets/icons/social  media/instagram.svg"
import youtubeIcon from "../assets/icons/social  media/youtube.svg"


export function Footer() {
    // ícones 29x29px
    // box 90xz60px

    return (
        <div className="grid md:flex md:justify-around md:w-full border-[1px] border-zinc-900 md:items-center md:p-10">

            <div>
                <p className="text-xl md:text-7xl">Nossas <br /> redes <br /> sociais</p>
                
            </div>

            <img src={setaCurvaIcon} alt="" />
            
            <div className="grid grid-cols-3 md:gap-x-10 md:gap-y-10 md:my-10">

                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                    <img src={linkedinIcon} className=" md:h-[50px]" />
                </div>
                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                     <img src={pinterestIcon} className="md:h-[50px] " />
                </div>
                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                    
                <img src={instaIcon} className="md:h-[50px] " />
                </div>
                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                <img src={tiktokIcon} className="md:h-[50px] h-[30px]" />
                </div>
                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                <img src={youtubeIcon} className="md:h-[50px] " />
                </div>
                <div className="md:w-[130px] md:h-[100px] grid justify-center items-center w-[90px] h-[60px]
                    border-[1px] border-zinc-900 hover:bg-[#dcdf1e]
                ">
                <img src={facebookicon} className="md:h-[50px] " />
                </div>
               

            </div>
        </div>
    )
}