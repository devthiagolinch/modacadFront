import telmaLogo from "../assets/svg/Logo TELMA BARCELLOS matriz.svg"
import shopIcon from "../assets/icons/icone compras site modacad SVG.svg"
import menuIcon from "../assets/icons/menu.svg"
import pesquisaicon from "../assets/icons/pesquisa.svg"

export function Header() {
    return (
        <div className="flex items-center gap-5 border-b-2 border-zinc-950 w-10/12">
            <img className="h-14 " src={telmaLogo}/>

            <nav className="flex items-center">
                <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-zinc-950 w-50 h-20 px-10 py-7 ">Meu Perfil</a>
                <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-zinc-950 w-50 h-20 px-10 py-7 ">Criar Perfil</a>
                <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-zinc-950 w-50 h-20 px-6 py-4 ">
                    <img src={shopIcon} alt=""  className="h-10" />
                </a>
                <a href="" className="font-medium text-sm border-2 border-r-0 border-b-0 border-zinc-950 w-50 h-20 px-6 py-7 ">
                    <img src={pesquisaicon} alt=""  className="h-5" />
                </a>
                <a href="" className="font-medium text-sm border-2 border-r-2 border-b-0 border-zinc-950 w-50 h-20 px-6 py-8 ">
                    <img src={menuIcon} />
                </a>
            </nav>
        </div>
    )
}