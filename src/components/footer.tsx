import setaCurvaIcon from "../assets/icons/seta-curva.svg";
import facebookicon from "../assets/icons/social  media/facebook.svg"
import tiktokIcon from "../assets/icons/social  media/tiktok.svg"
import pinterestIcon from "../assets/icons/social  media/pinterest.svg"
import linkedinIcon from "../assets/icons/social  media/linkedin.svg"
import instaIcon from "../assets/icons/social  media/instagram.svg"
import youtubeIcon from "../assets/icons/social  media/youtube.svg"


export function Footer() {

    return (
        <div className="flex justify-around lg:w-full border-2 border-t-0 border-zinc-900 items-center lg:p-10">

            <div>
                <p className="lg:text-7xl">Nossas <br /> redes <br /> sociais</p>
                
            </div>

            <img src={setaCurvaIcon} alt="" />
            
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-5 lg:gap-y-5">

                <img src={linkedinIcon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />
                <img src={pinterestIcon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />
                <img src={instaIcon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />
                <img src={tiktokIcon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />
                <img src={youtubeIcon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />
                <img src={facebookicon} className="border-2 border-zinc-900 lg:p-7 hover:bg-yellow-400 lg:h-24" />

            </div>
        </div>
    )
}