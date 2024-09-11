import { Button } from "./Button";


export function TextoPremium() {

    return (

        <div className=" flex flex-col justify-center items-center w-full h-auto 
            mb-[40px]
        ">
            <h1 className="text-[22px] text-center leading-[25px] mb-[20px]">
                Texto exclusivo
                comunidadeModacad.
            </h1> 

            <Button title="Conheça os Planos de Leitura" active={true} />
        </div>
    )
}