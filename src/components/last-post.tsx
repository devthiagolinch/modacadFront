import postBanner from "../assets/imgs/model.jpg"

export function LastPost() {

    return(
        <div className="flex justify-around">

            <div className="flex items-center">
                <p className="transform: -rotate-90 font-medium text-xs">Último Texto</p>
            </div>

            <div className="grid w-[44%] p-10 gap-10">
                <span>

                    Eventos <br />
                    asflkasjfksaljf <br />
                    asflasfljk <br />


                </span>

                <h1 className="text-6xl">
                    Estilismo pelo mundo TOKIO Outono inverno 2024 2025
                </h1>

                <p className="text-lg text-justify w-[90%]">
                    Estilismo pelo mundo é uma série de textos do blogModaCad sobre a criação e
                    comercialização da moda fiel às raízes culturais de povos fora...
                </p>
            </div>

            <div className="flex-1 max-h-auto w-full">
                <img src={postBanner} className="h-full w-full object-cover object-top" />
            </div>
            
        </div>
    )
}