import telmaLogo from "../assets/svg/HOME logo TELMA BARCELLOS modacad.svg"
import shopIcon from "../assets/icons/icone compras site modacad SVG.svg"
import menuIcon from "../assets/icons/menu.svg"
import pesquisaicon from "../assets/icons/pesquisa.svg"
import { Link } from "react-router-dom"

export function Header() {
    return (
        <div className="flex lg:items-center w-[100%] border-b-[1px] border-l-[1px] border-r-[1px] border-[#202020] bg-[#f1ece8]
            shadow-read
        ">
            <div className="flex w-full justify-between relative">

                <div className=" md:flex-1 justify-center items-center flex w-[60%]" >
                    <Link to={"/"} className="w-40 md:w-[23%]"><img src={telmaLogo}/></Link>
                </div>
                
                <nav className="flex items-center">
                    <a href="/" className="hidden lg:flex font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-5 py-7
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                    ">Meu Perfil</a>
                    <a href="" className="hidden lg:flex font-normal border-l-2 lg:font-medium lg:text-sm lg:border lg:border-r-0 lg:border-b-0 lg:border-t-0 lg:border-zinc-950 md:w-50 md:h-20 lg:px-5 lg:py-7
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                    ">Criar Perfil</a>
                    <a href="" className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-6
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                    ">
                        <img src={shopIcon} alt=""  className="h-5 lg:h-7 lg:stroke-2" />
                    </a>
                    <a href="" className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-7
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                    ">
                        <img src={pesquisaicon} alt=""  className="h-2.5 lg:h-5" />
                    </a>
                    <a href="" className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-8
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                    ">
                        <img src={menuIcon} className="h-2 lg:h-4 stroke-1" />
                    </a>
                </nav>
            </div>

        </div>
    )
}