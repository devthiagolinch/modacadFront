import setaCurvaIcon from "../assets/icons/seta-curva.svg"
import { Button } from "./Button"

export function ReadingBox() {

    return (
        <div className="grid">
            <div className="flex flex-col lg:flex-row justify-center gap-x-[350px] w-full 
                pt-[20px] pb-[20px]
                shadow-read
                md:border-[1px] md:border-[#202020] items-center
            " >
                {/** MOBILE */}
                <div className="lg:hidden flex flex-col justify-center items-center mb-[20px]">
                    <p className=" text-[40px] font-butler_ultra_light leading-[40px]">Planos de leitura</p>
                    <span className="text-[20px] font-montserrat_light_italic">Plano básico gratuito</span>
                </div>

                <img src={setaCurvaIcon} alt="" className="hidden max-h-[40px]" />

                {/** DESKTOP */}
                <div className="hidden lg:flex lg:items-center lg:justify-between  pt-[30px] pb-[35px]">
                    <div className="mr-[20px]">
                        <p className="text-[40px] font-butler_ultra_light md:text-7xl leading-[40px]">Planos <br /> de leitura</p>
                        <span className="font-montserrat_light_italic">Plano básico de leitura</span>
                    </div>
                    <img src={setaCurvaIcon} alt="" className=" max-h-[40px]" />
                </div>


                {/** MOBILE */}
                <div className="lg:hidden flex flex-col-reverse justify-center items-center w-full px-[20px]">
                    <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                        text-[20px] font-thin
                        border-b-[1px] border-slate-900 shadow-sm placeholder-slate-700 text-center
                        focus:outline-none
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                </div>

                <button className="lg:hidden flex flex-col h-[40px] w-[170px] border-[1px] border-[#202020] font-montserrat_light_italic text-[18px]
                    justify-center items-center
                ">
                    <p className="sticky">Criar perfil</p>
                    <div className="w-[90%] h-[19px] bg-[#dcdf1e] -mt-[14px]  ">
                    </div>
                </button>

                {/** DESKTOP */}

                <div className="lg:flex hidden lg:flex-col lg:justify-center lg:items-center md:my-10  px-[20px] mb-[40px h-[100%] w-[29%]">
                    <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                        text-[20px] font-montserrat_light_italic
                        border-b-[1px] border-slate-900 shadow-sm placeholder-slate-700 text-center
                        focus:outline-none
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>

                    <Button title="Criar Perfil" />
                </div>

            </div>
        </div>

    )
}