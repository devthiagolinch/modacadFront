import postBanner from "../assets/imgs/unsplash.jpg"

export function LastPost() {

    return(
        <div className="flex w-full h-96 p-10">

            <div className="flex h-full items-center justify-center align-middle">
                <p className="transform: -rotate-90">Último Texo</p>
            </div>

            <div className="grid w-[35%] ">
                <span>
                    sfkljfklasjfklaj <br />
                    asflkasjfksaljf <br />
                    asflasfljk <br />


                </span>

                <h2>
                    Estilismo pelo mundo TOKIO Outono inverno 2024 2025
                </h2>

                <p>
                    Estilismo pelo mundo é uma série de textos do blogModaCad sobre a criação e comercialização da moda fiel às raizes culturais de povos...
                </p>
            </div>

            <div className="flex-1 bg-gray-400">
                <img src={postBanner} className="h-full w-full object-cover object-top" />
            </div>
            
        </div>
    )
}