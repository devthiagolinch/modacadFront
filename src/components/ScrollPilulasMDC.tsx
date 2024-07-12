import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";
import { Link } from "react-router-dom";
import { PilulaModacadCard } from "./cards/pilulasModacadCard";

interface TextScrollInterface {
  title: string
}

// ARRUMAR AS TAGS DOS CARDS PARA TER MAIS DISTANCIA ENTRE ELES

export function ScrollPiluaMCD({title}: TextScrollInterface) {
  const cards = ServiceData.filter((t) => t.type == "pilulas")
  
  return (
    
    <div className="flex flex-row -mt-[1px] z-0" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px]">
        <Link to={"/pilulas"}>
          <p className="text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>  
        </Link>
      </div>

      <div className="flex-1 items-center flex-col  h-auto w-[90%] -ml-[1px] ">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween:0,
            },
            750: {
              slidesPerView: 5,
              spaceBetween: -8,
            },
          }}
          freeMode={false}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, A11y]}
          className="lg:w-[1255px] -ml-[1px] h-[100%]"
        >
          {cards.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/pilulas/${item.id}`} >
                <PilulaModacadCard banner={item.backgroundImage} description={item.description} tags={item.tag} title={item.title} id={item.id} />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>

  );
};