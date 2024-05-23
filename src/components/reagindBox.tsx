import setaCurvaIcon from "../assets/icons/seta-curva.svg"

export function ReadingBox() {

    return (
        <div className="flex items-center justify-center gap-24 border-2 border-zinc-950 p-10 py-5 
        shadow-[0_10px_10px_0] shadow-gray-400" >

            <div className="grid gap-2">
                <p className="text-5xl">Planos de leitura</p>
                <span>Plano basico de leitura</span>
            </div>

            <img src={setaCurvaIcon} className="w-10" />

            <div className="grid gap-4">
            <input type="email" placeholder="Coloque seu e-mail aqui..." className="mt-1  w-full px-3 py-2 bg-transparent 
                border-b-2 border-slate-900 text-sm shadow-sm placeholder-slate-700 text-center
                focus:outline-none
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
                <button type="submit" className=" border-2 border-zinc-900 h-16  p-4">
                    <p className="hover:decoration-yellow-400/40 hover:line-through hover:decoration-10">Criar Perfil</p>
                    
                </button>
            </div>
        </div>
    )
}