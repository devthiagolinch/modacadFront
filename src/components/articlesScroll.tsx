import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";

export function ArticlesScroll() {
  
  return (
    
    <div className="flex flex-row" >
      <div className="grid items-center bg-gray-500">
        <p className="
        bg-green-400 w-[100%] transform: -rotate-90 ">Textos mais lidos</p>
      </div>

      <div className="flex items-center flex-col h-auto w-[95%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            700: {
              slidesPerView: 4,
              spaceBetween: 168,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[100%] lg:max-w-[100%]"
        >
          {ServiceData.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="flex flex-col mb-10 group shadow-lg border border-gray-950 text-black px-6 py-8 h-[350px] w-full lg:h-[500px] lg:w-[350px] overflow-hidden cursor-pointer">
                <div
                  className=" "
                />
                <div className=" " />
                  <div className=" grid gap-3 p-0">
                    <div>

                    </div>
                    <img src={item.backgroundImage} className=" max-h-[100%]" />
                    <ul>
                      <li className="text-xs font-normal">Tendências</li>
                      <li className="text-xs font-normal">Indígena</li>
                      <li className="text-xs font-normal">Outono</li>
                    </ul>
                    <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                    <p className=" text-sm lg:text-[14px]">{item.content} </p>
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

  );
};