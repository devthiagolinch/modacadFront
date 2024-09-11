import setaCurvaIcon from "../../assets/icons/seta-curva.svg"
import { Button } from "./Button"

export function ReadingBox() {

    return (
        <div className="mx-auto">
            <div className="flex flex-col lg:flex-row justify-center gap-x-[350px] w-full -mb-[1px]
                py-[60px]
                shadow-read
                border-[1px] border-[#202020] items-center
                " >
                {/** MOBILE */}
                <div className="lg:hidden flex flex-col justify-center items-center mb-[35px]">
                    <p className=" text-[40px] font-butler_ultra_light leading-[40px] mb-[20px]">Planos de leitura</p>
                    <span className="text-[20px] leading-5 font-montserrat_light_italic max-w-[80%] text-center md:text-left">para conteúdos exclusivos modacad</span>
                </div>

                {/** DESKTOP */}
                <div className="hidden lg:w-full lg:flex lg:justify-around lg:items-center
                    lg:pt-[30px] lg:pb-[35px]
                    lg:px-[55px]
                    ">

                    <div className="lg:mr-10">
                        <p className="md:text-[70px] text-[50px] font-butler_ultra_light leading-[65px]">Planos de leitura</p>
                        <span className="font-montserratLight md:text-[30px] text-[25px]">para conteúdos exclusivos modacad</span>
                    </div>

                    <img src={setaCurvaIcon} alt="" className="max-h-[40px]" />

                    <div className="hidden lg:flex  lg:flex-col lg:justify-center lg:items-center md:my-10  px-[20px] lg:mr-12 mb-[40px] h-[100%] w-[29%]">

                        <Button title="Conheça os planos" active={false} link="planos" />
                    </div>
                </div>



                {/** MOBILE */}
                <div className="lg:hidden flex flex-col justify-center items-center w-full px-[20px]">
                    <Button title="Conheça os planos" active={false} />
                </div>

                

            </div>
        </div>

    )
}