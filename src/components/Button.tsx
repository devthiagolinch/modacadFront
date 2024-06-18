
interface buttonInterface {
    title: string
}
// fonte sera montserrat
export function Button(props: buttonInterface) {

    return (
        <button className="min-h-[60px] w-auto min-w-[210px] p-2 px-[25px] border-[1px] border-[#202020] font-montserrat_medium text-[22px]
            flex flex-col justify-center items-center
        ">
            <p className="sticky">{props.title}</p>
            <div className="w-[110%] h-[19px]  lg:hover:bg-[#dcdf1e]  -mt-[14px]  ">
            </div>
        </button>
    )
}