import postBanner from "../assets/imgs/model.jpg"

export function LastPost() {

    return(
        <div className="flex lg:justify-around">

            <div className="flex items-center">
                <p className="transform: -rotate-90 font-medium text-xs w-full">Último Texto</p>
            </div>

            <div className="grid  lg:flex">
                <div className="grid w-full gap-4 lg:w-[44%] lg:p-10 lg:gap-10">
                    <span className="text-sm lg:text-md">

                        Eventos <br />
                        asflkasjfksaljf <br />
                        asflasfljk <br />


                    </span>

                    <h1 className="text-xl lg:text-6xl">
                        Estilismo pelo mundo TOKIO Outono inverno 2024 2025
                    </h1>

                    <p className="text-xs lg:text-lg text-justify w-[90%]">
                        Estilismo pelo mundo é uma série de textos do blogModaCad sobre a criação e
                        comercialização da moda fiel às raízes culturais de povos fora...
                    </p>
                </div>

                <div className="flex lg:flex-1 max-h-auto w-full sm:shrink-0">
                    <img src={postBanner} className="h-full w-full object-cover object-top sm:h-full" />
                </div>
            </div>
            
            
        </div>
    )
}