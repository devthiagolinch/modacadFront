interface PilulaCardDTO {
    id: string
    banner: string,
    title: string,
    description: string,
    tags: string[]
}

export function PilulaModacadCard({id, banner, title, description, tags}: PilulaCardDTO) {

    return (

        <div className="min-2-[150px] lg:w-[250px] border-[1px] border-[#202020] h-[100%]
        " key={id}>
            <div>
                <img src={banner} alt="" className="h-[250px] object-cover" />
            </div>

            <div className="p-[10px]">
                <div className="grid">
                    {/* {tags?.map((t) => (
                        <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>
                    ))} */}
                </div>

                <h1 className="text-[16px] font-butler_bold leading-[20px] mb-[10px] mt-[8px]">
                    {title}
                </h1>

                <p className="text-[14px] font-montserratRegular leading-[15px] h-[45px] overflow-hidden mb-[10px]">
                    {description}
                </p>

                <p className="text-[14px] font-montserratRegular leading-[15px] h-[45px] overflow-hidden mb-[10px]">
                    {tags}
                </p>
            </div>
        </div>

    )
}