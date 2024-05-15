import setaCurvaIcon from "../assets/icons/seta-curva.svg"

export function Heading() {

    return (
        <div className="flex items-center gap-7 border-2 border-zinc-950 w-10/12 p-10" >

            <div className="grid gap-2">
                <p className="text-5xl">Planos de leitura</p>
                <span>Plano basico de leitura</span>
            </div>

            <img src={setaCurvaIcon} alt="" />

            <div className="grid gap-4">
                <input type="email" name="" id="" placeholder="Coloque seu e-mail aqui..." 
                    className="bg-transparent border-b-2 border-zinc-900"
                />
                <button type="submit" className="border-2 border-zinc-900 h-20">
                    Criar Perfil
                </button>
            </div>
        </div>
    )
}