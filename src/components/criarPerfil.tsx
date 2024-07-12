import { Button } from "./Button";


export function CriarPerfil() {

    return(
        <div className="w-[100%] h-screen justify-center fixed flex  backdrop-blur-sm">
            <div className="bg-[#f1ece8] p-[10px] h-[385px] w-[80%] min-w-[320px] max-w-[500px] justify-self-center items-center mt-[8%]">
                <div className="border-[1px] border-[#202020] flex flex-col justify-center items-center p-[20px]">
                    <div className="font-butler_ultra_light text-[25px] w-full min-h-[30px] flex justify-center items-center mb-[20px]">
                        Seu Perfil
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <form action="" method="post" className=" mb-[20px] px-3 min-w-[100%] md:min-w-[50%] md:max-w-[70%]">
                            <input type="email" placeholder="Coloque seu e-mail aqui" className="w-full mb-[20px] bg-transparent
                                text-[16px] font-montserratLight
                                border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                focus:outline-none
                                disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            "/>
                            <input type="email" placeholder="Seu nome" className="w-full mb-[20px] bg-transparent
                                text-[16px] font-montserratLight
                                border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                focus:outline-none
                                disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                            "/>
                            <input type="email" placeholder="Sua senha" className="w-full mb-[20px] bg-transparent
                                text-[16px] font-montserratLight
                                border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                focus:outline-none
                                disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                            "/>
                            <input type="email" placeholder="Repita sua senha" className="w-full mb-[20px] bg-transparent
                                text-[16px] font-montserratLight
                                border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                focus:outline-none
                                disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                            "/>
                        </form>
                        <Button title={"Enviar"} active={true} link="planos" />
                    </div>
                </div>
            </div>

        </div>

    )
}