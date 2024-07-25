import { ScrollTextoMCD } from "../components/ScrollTextoMDC"
import { ScrollPiluaMCD } from "../components/ScrollPilulasMDC"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LastPost } from "../components/last-post"
import { ReadingBox } from "../components/reagindBox"
import { Subjects } from "../components/subjects"

import banner from "../assets/imgs/Banner-home.jpg"
import { ScrollTextosMaisLidos } from "../components/ScrollTextoMaisLidos"

import { UserProfileCard } from "../components/cards/renovarPlano"
import { CriarPerfilCard } from "../components/cards/criarPerfilCard"
import { LoginCard } from "../components/cards/loginCard"

export function Home() {
  return( 
    <div className="mx-auto h-screen overflow-hidden">
      <Header />
      <CriarPerfilCard />
      <img src={banner} alt="" className="min-w-full max-h-[650px] object-cover" />
      <ReadingBox />
      <LastPost />
      <Subjects /> 
      <ScrollTextosMaisLidos title={"TEXTOS MAIS LIDOS"} />
      <ScrollTextoMCD title={"TEXTO PUBLICADOS"} />
      <ReadingBox />
      <ScrollPiluaMCD title={"PILULAS MODACAD"} />
      <div className="h-96">

      </div>

      <Footer />
    </div>
    
  )
}
