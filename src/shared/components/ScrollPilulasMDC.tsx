import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

/* import { RxArrowTopRight } from "react-icons/rx"; */
import { Link } from 'react-router-dom';
import { PilulaModacadCard } from './cards/pilulasModacadCard';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../api/posts/PostsService';

interface TextScrollInterface {
  title: string;
}

export function ScrollPilulaMCD({ title }: TextScrollInterface) {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    PostsService.getAll({ type: 'pilula', status: 'published' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response.posts);
    });
  }, []);

  return (
    <div className="flex flex-row -mt-[1px] z-0">
      <div className="flex justify-center items-center border-[1px] border-[#202020] -mr-[1px] pt-32">
        <Link to={'/pilulas'}>
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
          className="lg:max-w-[1400px] -ml-[1px] h-[100%]"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <Link to={`/pilulas/${post.id}`}>
                <PilulaModacadCard post={post} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
