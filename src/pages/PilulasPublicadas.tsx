import { ServiceData } from "../assets/utils/constants.index"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Link } from "react-router-dom"
import { ReadingBox } from "../components/reagindBox"
import { Button } from "../components/Button"
import { PilulaModacadCard } from "../components/cards/pilulasModacadCard"


export function PilulasPublicadas() {
    const data = ServiceData.filter((t) => t.type == "pilulas")

    return (
        <div className="">
            <Header />

            <div className="lg:flex lg:flex-col
                justify-center items-center -mb-[1px]
            ">
                <div className="w-full flex items-center px-[10px] mt-5 lg:px-[115px]">
                    <h1 className="font-butler_ultra_light text-[26px] md:text-[40px]">Pilulas publicadas</h1>
                    <div className="w-[40%] lg:w-[65%] h-0 border-t-[1px] ml-[20px] border-[#202020]"></div>
                </div>

                <div className="lg:grid lg:grid-cols-4 mt-5 flex-col justify-center items-center lg:px-20
                    grid grid-cols-2
                ">
                    {data.map((texto) => (
                        <Link to={`/pilulas/${texto.id}`}>
                            <PilulaModacadCard id={texto.id} banner={texto.backgroundImage} title={texto.title} description={texto.description} tags={texto.tag} />
                        </Link>
                    ))}
                </div>
                <div className="lg:mb-[80px] lg:mt-[60px] mt-[25px] mb-[50px] justify-center items-center flex">
                    <Button title={"Carregar mais"} />
                </div>
            </div>

            <ReadingBox />
            <Footer />
        </div>
    )
}