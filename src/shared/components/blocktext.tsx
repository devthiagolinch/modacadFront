import { Button } from "./Button";


export function BlockText() {

    return (

        <div className=" flex flex-col justify-center items-center w-full h-auto relative
            lg:pt-20  lg:-mt-[30px] mb-[40px]
            bg-[#f1ece8]
            shadow-whiteBlur
        ">
            <h1 className="text-[22px] ">Para continuar a ler</h1>
            <input type="email" placeholder="Coloque seu e-mail aqui..." className="mt-[20px] w-[40%] mb-10 lg:px-3 lg:py-2 bg-transparent
                border-b-[1px] border-slate-900 text-[18px] shadow-sm placeholder-slate-700 text-center
                focus:outline-none
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>

            <Button title={"Continuar"} active={true} />
        </div>
    )
}