import setaCurvaIcon from "../assets/icons/seta-curva.svg"


export function Footer() {

    return (
        <div className="w-full bg-green-600 flex items-center p-10 gap-5 align-middle">

            <div>
                <p className="text-7xl">Nossas <br /> redes <br /> sociais</p>
                
            </div>

            <img src={setaCurvaIcon} alt="" />
            
            <div className="grid grid-cols-3 gap-x-5 gap-y-5">

                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />
                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />
                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />
                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />
                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />
                <img src={setaCurvaIcon} className="border-2 border-zinc-900 p-7 hover:bg-yellow-400" />

            </div>
        </div>
    )
}