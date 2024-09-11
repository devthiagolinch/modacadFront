import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { Link } from "react-router-dom";
import { PilulaModacadCard } from "./cards/pilulasModacadCard";
import { useEffect, useState } from "react";
import { api } from "../services/lib/axios";

interface TextScrollInterface {
  title: string
}

interface Post {
  id: string;
  html: string;
  title: string;
  slug: string;
  tags: string[];
  feature_image: string;
  visibility: string;
  type: string;
  plaintext: string;
  admin_id: string
}

// ARRUMAR AS TAGS DOS CARDS PARA TER MAIS DISTANCIA ENTRE ELES

export function ScrollPiluaMCD({title}: TextScrollInterface) {
  const [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/post/pilulas").then((response) => setCards(response.data))
  }, [])
  
  return (
    
    <div className="flex flex-row -mt-[1px] z-0" >
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-32">
        <Link to={"/pilulas"}>
          <p className="text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>  
        </Link>
      </div>

      <div className="flex-1 items-center flex-col  h-auto w-[90%] -ml-[1px] ">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={97}
          slidesPerView={4}
          navigation
          pagination
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="lg:max-w-[1400px] -ml-[1px] h-[100%]"
        >
          {cards.map((item) => (
              
            <SwiperSlide key={item.id}>

              <Link to={`/pilulas/${item.id}`} >
                <PilulaModacadCard banner={item.id} description={item.slug} tags={item.tags} title={item.title} id={item.id} />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

  );
};