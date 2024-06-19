
interface buttonInterface {
    title: string
}
// fonte sera montserrat
export function Button(props: buttonInterface) {

    return (
        <button className="min-h-[60px] w-auto min-w-[210px] p-2 px-[25px]
            border-[1px] border-[#202020]
            font-montserrat_medium text-[22px]
            flex flex-col justify-center items-center
            bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_75%]
        ">
            {props.title}
        </button>
    )
}
