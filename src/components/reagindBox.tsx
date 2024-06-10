import setaCurvaIcon from "../assets/icons/seta-curva.svg"

export function ReadingBox() {

    return (
        <div className="flex flex-col items-center justify-center py-[20px]
            border-l-[1px]border-r-[1px] border-[#202020] w-full
            shadow-[0_0px_30px_0]
            shadow-[#33333381]
        " >

            <div className="flex flex-col justify-center items-center mb-[20px]">
                <p className=" text-[40px] font-title leading-[40px]">Planos de leitura</p>
                <span className="text-[20px] font-light">Plano básico gratuito</span>
            </div>

            <img src={setaCurvaIcon} alt="" className="hidden max-h-[40px]" />

            <div className="lg:flex-1 flex flex-col-reverse justify-center w-full px-[20px]">
                <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                    text-[20px] font-thin
                    border-b-[1px] border-slate-900 shadow-sm placeholder-slate-700 text-center
                    focus:outline-none
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "/>
            </div>

            <button className="h-[40px] w-[170px] border-[1px] border-[#202020] font-normal text-[18px]">
            Criar perfil
            </button>
        </div>
    )
}