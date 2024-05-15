import { Header } from "./components/header"
import { ReadingBox } from "./components/reagindBox"

export function App() {
  return( 
    <div className="max-w-[1216px] mx-auto py-2 flex flex-col gap-5 items-center">
      <Header />
      <ReadingBox />
    </div>
  )
}

export default App
