import { Swiper, SwiperSlide } from 'swiper/react';

import { IPostData } from '../../../../shared/api/posts/PostsService';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { SwiperSlidePost } from '../../swiper-slide-post/SwiperSlidePost';

interface ISwiperPosts {
  posts: IPostData[];
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts }) => {
  return (
    <div className="flex items-center flex-col h-auto w-auto lg:min-w-[97.1%]">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={97}
        slidesPerView={3}
        navigation
        scrollbar={{ draggable: true }}
        className="lg:max-w-[1400px] -ml-[1px] h-[100%]"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <SwiperSlidePost post={post}></SwiperSlidePost>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
