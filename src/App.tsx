import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { ReadingBox } from "./components/reagindBox"
import { Subjects } from "./components/subjects"

export function App() {
  return( 
    <div className="max-w-[1216px] mx-auto">
      <Header />
      <div className="">
        <div className="h-96">

            </div>

            <ReadingBox />
            <Subjects />
            <div className="h-96">
    
            </div>

            <ReadingBox />

            <Footer />
        </div>
    </div>
    
  )
}

export default App
