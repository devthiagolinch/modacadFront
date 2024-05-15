import telmaLogo from "../assets/svg/Logo TELMA BARCELLOS matriz.svg"
import shopIcon from "../assets/icons/icone compras site modacad SVG.svg"
import menuIcon from "../assets/icons/menu.svg"

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <img className="h-10" src={telmaLogo}/>

            <nav className="flex items-center">
                <a href="" className="font-medium text-sm border-2 border-r-0 border-zinc-950 w-50 h-20 p-6 ">Meu Perfil</a>
                <a href="" className="font-medium text-sm border-2 border-r-0 border-zinc-950 w-50 h-20 p-6 ">Criar Perfil</a>
                <a href="" className="font-medium text-sm border-2 border-r-0 border-zinc-950 w-50 h-20 p-6 ">
                    <img src={shopIcon} alt=""  className="h-10" />
                </a>
                <a href="" className="font-medium text-sm border-2 border-zinc-950 w-50 h-20 p-6 ">
                    <img src={menuIcon} />
                </a>
            </nav>
        </div>
    )
}