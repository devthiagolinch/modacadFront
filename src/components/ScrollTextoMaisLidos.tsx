import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"


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

export function ScrollTextosMaisLidos({title}: TextScrollInterface) {
  
  return (
    
    <div className="flex flex-row -mt-[1px]" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px]">
        <Link to={`/maislidos`}>
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
          freeMode={false}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, A11y]}
          className="lg:w-[1255px] -ml-[1px] h-[100%]"
        >
          {ServiceData.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/textomodacad/${item.id}`} >
                <TextoMocadCard id={item.id} banner={item.backgroundImage} title={item.title} description={item.description} tags={item.tag}  />
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide key={"01940914"}>
            <Link to={`/textospublicados/`} >

              <div className="w-[300px] lg:w-[500px] h-full border-[1px] border-[#202020]">
                <div className=" border-b-[1px] border-[#202020]">
                  <img src="src\assets\imgs\unsplash.jpg" alt="" className="h-[150px] lg:h-[250px] w-full object-cover object-top" />
                </div>

                <div className="p-[10px]">

                  <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[5px]">
                    TODOS OS TEXTOS PUBLICADOS
                  </h1>

                  <p className="font-montserratRegular text-[17px] leading-[20px]">
                    VEJA AQUI TODOS OS TEXTOS PUBLICADOS E DIVIRTA-SE COM VÁRIOS CONTEÚDOS INCRÍVEIS
                  </p>
                </div>
              </div>

            </Link>
          </SwiperSlide>
        </Swiper>

      </div>
    </div>

  );
};