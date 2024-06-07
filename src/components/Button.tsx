
interface buttonInterface {
    title: string
}
// fonte sera montserrat
export function Button(props: buttonInterface) {

    return (
        <button className="h-[50px] w-[210px] border-[1px] border-zinc-950 font-semibold text-[22px]">
            {props.title}
        </button>
    )
}