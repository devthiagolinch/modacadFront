import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";

export function ScrollPilulasMDC() {
  
  return (
    
    <div className="flex flex-row" >
      <div className="grid items-center border border-gray-950
      shadow">
        <p className="
        text-nowrap transform: -rotate-90 w-8 p-4 lg:w-20">Textos mais lidos</p>
      </div>

      <div className="flex items-center flex-col h-auto w-[91.9%] lg:w-[100%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 352,
            },
          }}
          freeMode={true}
          /* pagination={{
            clickable: false,
          }} */
          modules={[FreeMode, Pagination, A11y]}
          className="max-w-[100%] lg:max-w-[100%] h-auto "
        >
          {ServiceData.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="flex flex-col group shadow-lg border border-gray-950 text-black h-[350px] w-full lg:h-[500px] lg:w-[550px] overflow-hidden cursor-pointer">
                <div
                  className=" "
                />
                <div className=" " />
                  <div className=" grid gap-4">
                    <div className="bg-pink-500 w-full h-60">
                      <img src={item.backgroundImage} className="h-full w-full object-cover object-top" />
                    </div>
                    <span>{item.tag.sort()}</span>
                    <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                    <p className=" text-sm lg:text-[14px]">{item.description} </p>
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>

  );
};