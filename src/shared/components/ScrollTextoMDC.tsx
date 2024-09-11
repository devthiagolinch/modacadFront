import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"

import '../../assets/css/navigations.css'


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { TextoMocadCard } from "./cards/textoModacadCard";
import { useEffect, useState } from "react";
import { api } from "../services/lib/axios";

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

export function ScrollTextoMCD({title}: TextScrollInterface) {
  const [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/textos").then(response => setCards(response.data))
  }, [])


  
  return (
    
    <div className="flex flex-row -mt-[1px]" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-32">
        <Link to={`/textosmodacad/`}>
          <p className="
          text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>
        </Link>
      </div>

      <div className="flex-1 items-center flex-col  min-h-[410px] w-[90%]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={97}
          slidesPerView={3}
          navigation={{enabled: true}}
          freeMode={true}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="mySwiper"
        >
          {cards?.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/texto/${item.id}`} >
                <TextoMocadCard id={item.id} banner={item.backgroundImage} title={item.title} description={item.description} tags={item.tags}  />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>       
      </div>
    </div>

  );
};