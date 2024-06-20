import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, FreeMode, Pagination } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { ServiceData } from "../assets/utils/constants.index";
import { Link } from "react-router-dom";

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

      <div className="flex items-center flex-col h-auto w-[91.9%] lg:w-[100%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: -200,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, A11y]}
          className="max-w-[100%] lg:max-w-[100%] h-auto "
        >
          {ServiceData.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/pilulas/${item.id}`} >
                <div className="flex flex-col group shadow-lg border-[1px] border-[#202020] text-black h-[350px] w-full lg:h-[500px] lg:w-[550px] overflow-hidden cursor-pointer">
                  <div
                    key={item.id}
                  />
                  <div className=" " />
                    <div className=" grid gap-4">
                      <div className="w-full h-60">
                        <img src={item.backgroundImage} className="h-full w-full object-cover object-top" />
                      </div>
                      <div className=" p-3">

                        {item.tag.map(tag => (
                          <span>• {tag} </span>
                        ))}
                        <h1 className="font-butler_ultra_light text-[30px] lg:text-[40px] lg:leading-[43px] mb-[20px]">{item.title} </h1>
                        <p className=" text-sm lg:text-[14px]">{item.description} </p>

                      </div>
                    </div>
                </div>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>

  );
};