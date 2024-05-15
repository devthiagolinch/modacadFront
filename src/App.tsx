import { Header } from "./components/header"
import { Heading } from "./components/heading"

export function App() {
  return( 
    <div className="max-w-[1216px] mx-auto py-2 flex flex-col gap-5 items-center">
      <Header />
      <Heading />
    </div>
  )
}

export default App
