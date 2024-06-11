
interface buttonInterface {
    title: string
    w?: number
}
// fonte sera montserrat
export function Button(props: buttonInterface) {

    return (
        <button className="min-h-[50px] w-[210px] border-[1px] border-[#202020] font-montserrat_medium text-[22px]">
            {props.title}
        </button>
    )
}