import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { TextoMocadCard } from './cards/textoModacadCard';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../api/posts/PostsService';

interface TextScrollInterface {
  title: string;
}

export function ScrollTextosMaisLidos({ title }: TextScrollInterface) {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    PostsService.getAll('texto').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response.posts);
    });
  }, []);

  return (
    <div className="flex flex-row -mt-[1px]">
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-24">
        <Link to={`/posts/popular`}>
          <p className="text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5">{title}</p>
        </Link>
      </div>

      <div className="flex items-center flex-col  h-auto w-auto lg:min-w-[97.1%]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={97}
          slidesPerView={3}
          navigation
          scrollbar={{ draggable: true }}
          className="lg:max-w-[1400px] -ml-[1px] h-[100%]"
        >
          {posts.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/posts/${item.id}`}>
                <TextoMocadCard post={item} />
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide key={'01940914'}>
            <Link to={`/posts/popular`}>
              <div className="w-[350px] lg:w-[550px] h-full border-[1px] border-[#202020]">
                <div className=" border-b-[1px] border-[#202020]">
                  <img
                    src="src\assets\imgs\unsplash.jpg"
                    alt=""
                    className="h-[150px] lg:h-[250px] w-full object-cover object-top"
                  />
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
}
