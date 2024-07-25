import { useEffect, useState } from "react"
import { newBlogAPI } from "../lib/axios"

interface Subjects {
    id: string,
    name: string
}

export function Subjects() {
    const [subjects, setSubjects] = useState<Subjects[]>([])
    

    useEffect(() => {
      newBlogAPI.get('/subjects').then(response => setSubjects(response.data))
    }, [])

    return (
        <main className="flex items-center lg:gap-5 lg:p-10 border-[1px] border-zinc-950" >
            <div className="transform: -rotate-90 ">
                <p className="font-light text-sm lg:font-medium lg:text-xs">ASSUNTOS</p>
            </div >

            <div className=" text-sm h-auto  lg:gap-4 lg:w-full lg:text-4xl items-center align-middle text-left font-butler_ultra_light" >

                {
                    subjects.map(sub => {
                        return (
                            <>
                                <a href="" className="px-2 lg:px-5
                                    bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:120%_.60em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_95%]
                                ">{sub.name}</a>
                                <span>•</span>
                            </>
                        )
                    })
                }

            </div>
        </main>
    )
}