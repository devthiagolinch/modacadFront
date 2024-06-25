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

export function ScrollPiluaMCD({title}: TextScrollInterface) {
  
  return (
    
    <div className="flex flex-row" >
      <div className="grid items-center border border-gray-950
        shadow">
        <p className="
        text-nowrap transform: -rotate-90 w-8 p-4 lg:w-20">{title}</p>
      </div>

      <div className="flex items-center flex-col w-full">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            750: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
            1080: {
              slidesPerView: 9,
              spaceBetween: 240,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, A11y]}
          className="w-[100%] "
        >
          {ServiceData.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/textomodacad/${item.id}`} >
                <PilulaModacadCard banner={item.backgroundImage} description={item.description} tags={item.tag} title={item.title} id={item.id} />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>

  );
};