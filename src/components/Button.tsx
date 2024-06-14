
interface buttonInterface {
    title: string
}
// fonte sera montserrat
export function Button(props: buttonInterface) {

    return (
        <button className="min-h-[60px] w-auto min-w-[210px] p-2 border-[1px] border-[#202020] font-montserrat_medium text-[22px]">
            {props.title}
        </button>
    )
}