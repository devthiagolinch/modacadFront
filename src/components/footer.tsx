import setaCurvaIcon from "../assets/icons/seta-curva.svg";
import facebookicon from "../assets/icons/social  media/facebook.svg"
import tiktokIcon from "../assets/icons/social  media/tiktok.svg"
import pinterestIcon from "../assets/icons/social  media/pinterest.svg"
import linkedinIcon from "../assets/icons/social  media/linkedin.svg"
import instaIcon from "../assets/icons/social  media/instagram.svg"
import youtubeIcon from "../assets/icons/social  media/youtube.svg"


export function Footer() {

    return (
        <div className="w-ful border-2 border-t-0 border-zinc-900 flex items-center p-10 gap-5 align-middle">

            <div>
                <p className="text-7xl">Nossas <br /> redes <br /> sociais</p>
                
            </div>

            <img src={setaCurvaIcon} alt="" />
            
            <div className="grid grid-cols-3 gap-x-5 gap-y-5">

                <img src={linkedinIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />
                <img src={pinterestIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />
                <img src={instaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />
                <img src={tiktokIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />
                <img src={youtubeIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />
                <img src={facebookicon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400 h-24" />

            </div>
        </div>
    )
}