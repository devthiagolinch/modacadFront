import { useEffect, useState } from "react"
import { newBlogAPI } from "../lib/axios"

import { ScrollTextoMCD } from "../components/ScrollTextoMDC"
import { ScrollPiluaMCD } from "../components/ScrollPilulasMDC"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LastPost } from "../components/last-post"
import { ReadingBox } from "../components/reagindBox"

import banner from "../assets/imgs/Banner-home.jpg"
import { ScrollTextosMaisLidos } from "../components/ScrollTextoMaisLidos"

interface Subjects {
    id: string,
    name: string
}
export function Home() {
  const [subjects, setSubjects] = useState<Subjects[]>([])
    

    useEffect(() => {
      newBlogAPI.get('/subjects').then(response => setSubjects(response.data))
    }, [])
  return( 
    <div className="mx-auto h-screen">
      <Header />
      <img src={banner} alt="" className="min-w-full max-h-[650px] object-cover" />
      <ReadingBox />
      <LastPost />

      <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px]" >
        <div className="flex justify-start items-center border-[1px] px-[8.3px] border-[#202020] -mr-[1px] -mt-[1px] -mb-[1px] align-middle">
            <p className="
            transform: -rotate-90 lg:w-[22px]">ASSUNTOS</p>
        </div>

        <div className="font-butler_ultra_light lg:text-[40px] leading-[60px]
        w-full items-center align-middle p-[60px]" >
            {
                  subjects.map(sub => {
                      return (
                          <>
                              <a key={sub.id} className="px-2 lg:px-5
                                bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:120%_.60em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_95%]
                              ">{sub.name}
                              </a>
                              <span className="text-2xl">•</span>
                          </>
                      )
                  })
            }
                

        </div>
      </div>

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
