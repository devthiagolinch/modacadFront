import { ArticlesScroll } from "../components/articlesScroll"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LastPost } from "../components/last-post"
import { ReadingBox } from "../components/reagindBox"
import { Subjects } from "../components/subjects"

export function App() {
  return( 
    <div className=" mx-auto">
      <Header />
      <div className="">
        <div className="h-96">

        </div>

        <ReadingBox />
        <LastPost />
        <Subjects />
        <ArticlesScroll />
        <ArticlesScroll />
        <div className="h-96">

        </div>

        <ReadingBox />

        <Footer />
        </div>
    </div>
    
  )
}

export default App