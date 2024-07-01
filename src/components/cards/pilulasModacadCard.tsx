import { ServiceData } from "../../assets/utils/constants.index"

interface PilulaCardDTO {
    id: string
    banner: string,
    title: string,
    description: string,
    tags: string[]
}

export function PilulaModacadCard({id}: PilulaCardDTO) {
    const pilula = ServiceData.find((pilula) => pilula.id == id);

    return (

        <div className="min-2-[150px] lg:w-[250px] border-[1px] border-[#202020] h-[100%]
        ">
            <div>
                <img src={pilula?.backgroundImage} alt="" className="h-[250px] object-cover" />
            </div>

            <div className="p-[10px]">
                <div className="grid">
                    {pilula?.tag.map((t) => (
                        <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>
                    ))}
                </div>

                <h1 className="text-[16px] font-butler_bold leading-[20px] mb-[10px] mt-[8px]">
                    {pilula?.title}
                </h1>

                <p className="text-[14px] font-montserratRegular leading-[15px] h-[45px] overflow-hidden mb-[10px]">
                    {pilula?.description}
                </p>
            </div>
        </div>

    )
}