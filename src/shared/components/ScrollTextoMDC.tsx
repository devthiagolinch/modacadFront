import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import '../../assets/css/navigations.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { TextoMocadCard } from './cards/textoModacadCard';
import React, { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../api/posts/PostsService';

interface TextScrollInterface {
  title: string;
}

export const ScrollTextoMCD: React.FC<TextScrollInterface> = ({ title }) => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    PostsService.getAll('texto').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response);
    });
  });

  return (
    <div className="flex flex-row -mt-[1px]">
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-32">
        <Link to={`/postssmodacad/`}>
          <p
            className="
          text-nowrap transform: -rotate-90 w-8 lg:w-[22px] lg:p-5"
          >
            {title}
          </p>
        </Link>
      </div>

      <div className="flex-1 items-center flex-col  min-h-[410px] w-[90%]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={97}
          slidesPerView={3}
          navigation={{ enabled: true }}
          freeMode={true}
          scrollbar={{ draggable: true }}
          className="mySwiper"
        >
          {posts?.map((post) => (
            <SwiperSlide key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <TextoMocadCard post={post} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
