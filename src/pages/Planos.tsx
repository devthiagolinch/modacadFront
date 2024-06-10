
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Button } from "../components/Button";

import checkListIcon from "../assets/icons/check-mark.svg";


export function PlanosMDC() {
    
    return(
        <div>
            <Header />

            <div className="
                flex flex-col justify-center align-center
                pt-32 pb-10 md:ml-32 md:w-auto ml-[5%]
                "
            >
                <h1 className="font-title md:text-[80px] text-[50px] leading-none
                -mb-3 md:-mb-0"
                >
                    Planos de Leitura
                </h1>
                <span className="md:text-[30px] text-[32px]  text-[#202020] font-extralight ">
                    Plano básico gratuito.
                </span>
            </div>

            
            <div className="hidden lg:flex lg:w-full lg:justify-center lg:items-center lg:my-5">
                <p className="lg:text-[18px] lg:font-medium">MELHOR PLANO</p>
            </div>

            <div className="lg:flex lg:justify-center">
                <div className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]
                    border-[1px] border-b-0 md:border-b-[1px] md:border-r-0 border-zinc-950"
                >
                    <div className="flex items-center justify-center ">
                        <p className="font-title text-[30px]">Premium Trimestral</p>
                    </div>
                    <div className="flex justify-center items-end">
                        <div className="flex -mb-12">
                            <span className="text-[50px] font-title">R$</span>
                            <p className="text-[150px] font-title">8</p>
                        </div>
                        <p className="justify-self-end text-[50px] font-title">/mês</p>
                    </div>

                    <p className="text-[25px] font-title mt-[30px] mb-[40px]">Escolha flexível</p>
                

                    <div className="mb-[40px] px-5">
                        <ul className="flex flex-col gap-[15px]">
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano Todas as vantagens do plano</li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano </li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" /> Todas as vantagens do plano</li>
                        </ul>
                    </div>

                    <Button title="Quero este" key={3}/>

                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]

                    shadow-[0_0px_30px_0]
                    shadow-[#33333381]

                    border-[1px] border-zinc-950"
                >
                    <div className="md:hidden">
                        <p className="text-[16px] font-medium">MELHOR PLANO</p>
                    </div>
                    <div className="flex items-center justify-center ">
                        <p className="font-title text-[30px]">Premium Anual</p>
                    </div>
                    <div className="flex justify-center items-end">
                        <div className="flex -mb-12">
                            <span className="text-[50px] font-title">R$</span>
                            <p className="text-[150px] font-title">8</p>
                        </div>
                        <p className="justify-self-end text-[50px] font-title">/mês</p>
                    </div>

                    <p className="text-[25px] font-title mt-[30px] mb-[40px]">Acesso descomplicado</p>
                    
                    <div className="mb-[40px] px-5">
                        <ul className="flex flex-col gap-[15px]">
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano Todas as vantagens do plano</li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano </li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" /> Todas as vantagens do plano</li>
                        </ul>
                    </div>

                    <Button title="Quero este" key={2}/>

                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]
                    border-[1px] border-t-0 md:border-t-[1px] md:border-l-0 border-zinc-950"
                >
                    <div className="flex items-center justify-center ">
                        <p className="font-title text-[30px]">Básico</p>
                    </div>
                    <div className="flex justify-center items-end">
                        <div className="flex -mb-12">
                            <span className="text-[50px] font-title">R$</span>
                            <p className="text-[150px] font-title">8</p>
                        </div>
                        <p className="justify-self-end text-[50px] font-title">/mês</p>
                    </div>

                    <p className="text-[25px] font-title mt-[30px] mb-[40px]">Garanta essas vantagens</p>
                    
                    <div className="mb-[40px] px-5">
                        <ul className="flex flex-col gap-[15px]">
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano Todas as vantagens do plano</li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" />Todas as vantagens do plano </li>
                            
                            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight"><img src={checkListIcon} alt="" className="h-[30px]" /> Todas as vantagens do plano</li>
                        </ul>
                    </div>

                    <Button title="Quero este" key={1}/>

                </div>
            </div>

            <div className="
                flex flex-col gap-2 justify-center items-start mx-[20px]
                md:px-32 md:mx-0 md:pb-[70px]
                md:border-l-[1px] md:border-r-[1px] border-zinc-950
            ">
                    <p className="text-[35px] font-title lg:text-[45px] md:my-[40px]">Perguntas frequentes</p>

                    <div className="md:w-[100%]">
                        <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]"
                        >
                            <h1 className="font-title text-[30px]">Como recebo meu comprovante de pagamento e minha nota fiscal?
                            </h1>
                            <p className="text-[20px] font-regular">
                                Você pode pagar via PIX, boleto ou cartão de crédito.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-[100%]">
                        <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]"
                        >
                            <h1 className="font-title text-[30px]">Como recebo meu comprovante de pagamento e minha nota fiscal?
                            </h1>
                            <p className="text-[20px] font-regular">
                                Você pode pagar via PIX, boleto ou cartão de crédito.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-[100%]">
                        <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]"
                        >
                            <h1 className="font-title text-[30px]">Como recebo meu comprovante de pagamento e minha nota fiscal?
                            </h1>
                            <p className="text-[20px] font-regular">
                                Você pode pagar via PIX, boleto ou cartão de crédito.
                            </p>
                        </div>
                    </div>

                </div>
            

            <Footer />
        </div>
    )
}