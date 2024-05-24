import telmaLogo from "../assets/svg/Logo TELMA BARCELLOS matriz.svg"
import shopIcon from "../assets/icons/icone compras site modacad SVG.svg"
import menuIcon from "../assets/icons/menu.svg"
import pesquisaicon from "../assets/icons/pesquisa.svg"

export function Header() {
    return (
        <div className="flex fixed w-full lg:items-center lg:w-[100%]  border-b-2 border-zinc-950 bg-neutral-200
        shadow-[0_10px_10px_0] shadow-gray-400
        ">
            
            <div className="flex w-full relative">

                <div className=" lg:flex-1" >
                    <img className="w-24 md:w-96" src={telmaLogo}/>
                </div>
                

                <nav className="flex items-center">
                    <a href="" className="hidden lg:flex font-medium text-sm border-2 border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-5 py-7 ">Meu Perfil</a>
                    <a href="" className="font-normal lg:font-medium lg:text-sm lg:border-2 lg:border-r-0 lg:border-b-0 lg:border-t-0 lg:border-zinc-950 sm:w-50 sm:h-20 lg:px-5 lg:py-7 ">Criar Perfil</a>
                    <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-4 ">
                        <img src={shopIcon} alt=""  className="h-5 lg:h-10" />
                    </a>
                    <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-7 ">
                        <img src={pesquisaicon} alt=""  className="h-2.5 lg:h-5" />
                    </a>
                    <a href="" className="font-medium text-sm border-2 border-r-2 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-8 ">
                        <img src={menuIcon} className="h-2 lg:h-4" />
                    </a>
                </nav>
            </div>

        </div>
    )
}