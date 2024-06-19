import { ScrollPilulasMDC } from "../components/ScrollPilulasMDC"
import { ScrollTextoMCD } from "../components/ScrollTextoMDC"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LastPost } from "../components/last-post"
import { ReadingBox } from "../components/reagindBox"
import { Subjects } from "../components/subjects"


export function Home() {
  return( 
    <div className="mx-auto">
      <Header />
      <div className="">
        <div className="h-96">

        </div>

        <ReadingBox />
        <LastPost />
        <Subjects />
        <ScrollTextoMCD />
        <ScrollTextoMCD />
        <ReadingBox />
        <ScrollPilulasMDC />
        <div className="h-96">

        </div>

        <ReadingBox />

        <Footer />
        </div>
    </div>
    
  )
}
