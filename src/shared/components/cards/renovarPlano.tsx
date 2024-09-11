import { UsersData } from "../../../assets/utils/usersData.index";
import { Button } from "../Button";


export function UserProfileCard() {
    const user = UsersData

    return (
        <div className="w-[100%] h-full bg-[#f1ece8]/70 fixed
            flex justify-center items-center pb-20
        ">
            <div className="bg-[#f1ece8] p-[10px] w-[80%] min-w-[320px] max-w-[500px] absolute">
                <div className="border-[1px] border-[#202020] flex flex-col justify-center items-center p-[20px]">
                        <div className="font-butler_ultra_light text-[25px] w-full min-h-[30px] flex justify-center items-center mb-[20px]">
                            Olá, Telma Barcelos!
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <form action="" method="post" className=" mb-[20px] px-3 min-w-[100%] md:min-w-[50%] md:max-w-[70%] text-center">
                                <input type="email" placeholder={user.email} className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserratLight
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none
                                    invalid:border-pink-500 invalid:text-pink-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                "/>
                                <input type="email" placeholder="Senha" className="w-full mb-[20px] bg-transparent
                                    text-[16px] font-montserrat_light_italic
                                    border-b-[1px] border-slate-900 shadow-sm placeholder-[#202020] text-center
                                    focus:outline-none
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                "/>
                                <span>Recuperar sua senha</span>
                            </form>
                            <Button title={"Enviar"} active={true} />

                            <div className="flex-col justify-center items-center text-center mt-[40px]">
                                <h1>Plano Premium</h1>
                                <h1>expira em 26/08/2025</h1>
                                <h1>Cartão de credito: VISA **** **** **** 5478</h1>
                            </div>
                        </div>
                </div>
            </div>
        </div>

    )
}