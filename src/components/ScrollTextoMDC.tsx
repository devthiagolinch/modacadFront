import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";
import { Link } from "react-router-dom";
import { TextoMocadCard } from "./cards/textoModacadCard";

interface TextScrollInterface {
  title: string
}

export function ScrollTextoMCD({title}: TextScrollInterface) {
  
  return (
    
    <div className="flex flex-row" >
      <div className="grid items-center border border-gray-950
      shadow">
        <p className="
        text-nowrap transform: -rotate-90 w-8 p-4 lg:w-20">{title}</p>
      </div>

      <div className="flex items-center flex-col h-auto w-[99%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1.2,
              spaceBetween: 3,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1080: {
              slidesPerView: 5,
              spaceBetween: 390,
            },
          }}
          freeMode={false}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, A11y]}
          className="w-full "
        >
          {ServiceData.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/textomodacad/${item.id}`} >
                <TextoMocadCard id={item.id} banner={item.backgroundImage} title={item.title} description={item.description} tags={item.tag}  />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>

  );
};