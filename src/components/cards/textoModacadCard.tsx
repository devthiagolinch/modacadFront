import { ServiceData } from "../../assets/utils/constants.index";

interface TextosCardDTO {
    id: string
    banner: string,
    title: string,
    description: string,
    tags: string[]
}

export function TextoMocadCard({id}: TextosCardDTO) {
    const texto = ServiceData.find((text) => text.id == id);

    return (
        <div className="border-t-[1px] border-[1px] border-[#202020] min-h-full w-[500px] h-[500px]" key={texto?.id}>
            {/** texto modacad card */}
                <div className="border-b-[1px] border-[#202020]">
                    <img src={texto?.backgroundImage} alt="" className="h-[250px] w-full object-cover" />
                </div>

                <div className="
                    p-[10px]
                ">
                    <div className="grid">
                        {texto?.tag.map((t) => (
                            <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>
                        ))}
                    </div>

                    <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[5px]">
                        {texto?.title}
                    </h1>

                    <p className="font-montserratRegular text-[17px] leading-[20px]">
                        {texto?.description}
                    </p>
                </div>
        </div>
    
    )

}