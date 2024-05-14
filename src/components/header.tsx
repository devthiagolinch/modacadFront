import telmaLogo from "../assets/svg/Logo TELMA BARCELLOS matriz.svg"

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={telmaLogo}/>

            <nav className="flex items-center gap-5">
                <a href="" className="font-medium text-sm text-neutral-500">Meu Perfil</a>
                <a href="" className="font-medium text-sm">Criar Perfil</a>
            </nav>
        </div>
    )
}