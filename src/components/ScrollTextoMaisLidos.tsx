import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { TextoMocadCard } from "./cards/textoModacadCard";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TextScrollInterface {
  title: string
}

interface Post {
  id: string,
  backgroundImage: string,
  title: string,
  description: string,
  tags: string[]
}

export function ScrollTextosMaisLidos({title}: TextScrollInterface) {
  const [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/textos").then(response => setCards(response.data))
  }, [])
  
  return (
    
    <div className="flex flex-row -mt-[1px]" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-24">
        <Link to={`/maislidos`}>
          <p className="
          text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>
        </Link>
      </div>

      <div className="flex items-center flex-col  h-auto w-auto lg:min-w-[97.1%]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={97}
          slidesPerView={3}
          navigation  
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="lg:max-w-[1400px] -ml-[1px] h-[100%]"
        >
          {cards.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/texto/${item.id}`} >
                <TextoMocadCard id={item.id} banner={item.backgroundImage} title={item.title} description={item.description} tags={item.tags}  />
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide key={"01940914"}>
            <Link to={`/textospublicados/`} >

              <div className="w-[350px] lg:w-[550px] h-full border-[1px] border-[#202020]">
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