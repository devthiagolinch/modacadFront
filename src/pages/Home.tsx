import { ScrollTextoMCD } from "../components/ScrollTextoMDC"
import { ScrollPiluaMCD } from "../components/ScrollPilulasMDC"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LastPost } from "../components/last-post"
import { ReadingBox } from "../components/reagindBox"
import { Subjects } from "../components/subjects"


export function Home() {
  return( 
    <div className="mx-auto">
      <Header />
        <div className="h-96">

        </div>

        <ReadingBox />
        <LastPost />
        <Subjects /> 
        <ScrollTextoMCD title={"TEXTO PUBLICADOS"} />
        <ReadingBox />
        <ScrollPiluaMCD title={"PILULAS MODACAD"} />
        <div className="h-96">

        </div>

        <Footer />
    </div>
    
  )
}
