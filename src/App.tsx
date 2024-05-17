import { Header } from "./components/header"
import { ReadingBox } from "./components/reagindBox"

export function App() {
  return( 
    <div className="max-w-[1216px] mx-auto">
      <Header />
      <div className="">
        <div className="h-96 bg-green-500">

            </div>

            <ReadingBox />

            <div className="h-96 bg-green-500">

            </div>
        </div>
    </div>
    
  )
}

export default App
