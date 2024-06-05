import setaCurvaIcon from "../assets/icons/seta-curva.svg"

export function ReadingBox() {

    return (
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-40 lg:border-2 lg:border-zinc-950 px-20 p-10 w-full
        shadow-[0_10px_10px_0] shadow-slate-950/50" >

            <div className="lg:grid w-[30%] lg:gap-2">
                <p className=" lg:text-7xl font-title">Planos de leitura</p>
                <span className="lg:text-2xl font-serif font-light">Plano basico de leitura</span>
            </div>

            <img src={setaCurvaIcon} className=" w-20 lg:w-20" />

            <div className="lg:flex-1 flex-col-reverse justify-center">
                <input type="email" placeholder="Coloque seu e-mail aqui..." className="mt-1  lg:w-full mb-5 lg:px-3 lg:py-2 bg-transparent 
                    border-b-2 border-slate-900 text-sm shadow-sm placeholder-slate-700 text-center
                    focus:outline-none
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "/>
                <button type="submit" className=" border-2 border-zinc-900 h-16 w-64 p-4">
                    <p className="hover:decoration-yellow-400/40 hover:line-through hover:decoration-10">Criar Perfil</p>
                    
                </button>
            </div>
        </div>
    )
}