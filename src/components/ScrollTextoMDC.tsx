import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"
import SetaEsquerda from "../assets/icons/seta-esquerda.svg"


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";
import { TextoMocadCard } from "./cards/textoModacadCard";

interface TextScrollInterface {
  title: string
}

export function ScrollTextoMCD({title}: TextScrollInterface) {
  const card = ServiceData.filter((texto) => texto.type == "textos");
  
  return (
    
    <div className="flex flex-row -mt-[1px]" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px]">
        <Link to={`/textospublicados/`}>
          <p className="
          text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>
        </Link>
      </div>

      <div className="flex-1 items-center flex-col  h-auto w-[90%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 305,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 243,
            },
          }}
          freeMode={true}
          modules={[FreeMode,Pagination, A11y]}
          className="lg:w-[1255px] -ml-[1px] h-[100%]"
        >
          {card.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/textomodacad/${item.id}`} >
                <TextoMocadCard id={item.id} banner={item.backgroundImage} title={item.title} description={item.description} tags={item.tag}  />
              </Link>
            </SwiperSlide>
          ))}

          <div className="flex h-[70px]">
            <img src={SetaEsquerda} />
          </div>
        </Swiper>       
      </div>
    </div>

  );
};