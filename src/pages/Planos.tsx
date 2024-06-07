import { Footer } from "../components/footer";
import { Header } from "../components/header";


export function PlanosMDC() {

    return(
        <div>
            <Header />

            <div className="
                flex flex-col justify-center align-center
                pt-32 pb-12 md:ml-32 md:w-auto ml-[5%]
                "
            >
                <h1 className="font-title md:text-[80px] text-[65px] leading-non
                    e"
                >
                    Planos <br /> de Leitura
                </h1>
                <span className="md:text-[30px] text-[25px]  text-[#202020] font-extralight ">
                    Plano básico gratuito.
                </span>
            </div>
            

            <Footer />
        </div>
    )
}