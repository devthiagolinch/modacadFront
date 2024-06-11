import setaCurvaIcon from "../assets/icons/seta-curva.svg"

export function ReadingBox() {

    return (
        <div className="grid">
            <div className="flex flex-col lg:flex-row md:justify-around md:w-full 
                    border-[1px] border-zinc-900 md:items-center
            " >
                {/** MOBILE */}
                <div className="lg:hidden flex flex-col justify-center items-center mb-[20px]">
                    <p className=" text-[40px] font-butler_ultra_light leading-[40px]">Planos de leitura</p>
                    <span className="text-[20px] font-light">Plano básico gratuito</span>
                </div>

                <img src={setaCurvaIcon} alt="" className="hidden max-h-[40px]" />

                {/** DESKTOP */}
                <div className="hidden lg:flex lg:justify-around lg:items-center px-[20px] mt-[30px] mb-[35px] ">
                    <div className="mr-[20px]">
                        <p className="text-[40px] font-butler_ultra_light md:text-7xl leading-[40px]">Planos <br /> de leitura</p>
                        <span>Plano básico de leitura</span>
                    </div>
                    <img src={setaCurvaIcon} alt="" className=" max-h-[40px]" />
                </div>


                {/** MOBILE */}
                <div className="lg:hidden flex flex-col-reverse justify-center w-full px-[20px]">
                    <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                        text-[20px] font-thin
                        border-b-[1px] border-slate-900 shadow-sm placeholder-slate-700 text-center
                        focus:outline-none
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                </div>

                <button className="lg:hidden h-[40px] w-[170px] border-[1px] border-[#202020] font-normal text-[18px]">
                Criar perfil
                </button>

                {/** DESKTOP */}

                <div className="lg:flex lg:flex-col lg:justify-center lg:items-center md:my-10 h-auto px-[20px] mb-[40px]">
                    <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                        text-[20px] font-thin
                        border-b-[1px] border-slate-900 shadow-sm placeholder-slate-700 text-center
                        focus:outline-none
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>

                    <button className=" h-[40px] w-[170px] border-[1px] border-[#202020] font-normal text-[18px]">
                        Criar perfil
                    </button>
                </div>

            </div>
        </div>

    )
}