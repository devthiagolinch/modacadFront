import { useRef } from 'react';

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { IPostData } from '../../../api/posts/PostsService';
import { SwiperSlidePost } from '../single/PostSlide';

import 'swiper/css';

interface ISwiperPosts {
  posts: IPostData[];
  slidesPerView?: number;
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts, slidesPerView = 2 }) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="border-x border-gray-800">
        <Swiper
          slidesPerView={Math.min(posts.length, slidesPerView)}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              const navigation = swiper.params.navigation;
              if (navigation) {
                console.log('prevRef:', prevRef.current, 'nextRef:', nextRef.current);
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }
            }
          }}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} style={{ height: 'auto' }}>
              <Link to={`/${post.type === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
                <SwiperSlidePost post={post} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Menu de navegação */}
      <div className="swiper-navigation flex">
        <div
          ref={prevRef}
          className="swiper-button-prev flex grow justify-center hover:bg-primary cursor-pointer py-6 border-t border-l border-r border-gray-950"
        >
          <ArrowLongLeftIcon className="size-12" />
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next flex grow justify-center hover:bg-primary cursor-pointer py-6 border-t border-r border-gray-950"
        >
          <ArrowLongRightIcon className="size-12" />
        </div>
      </div>
    </div>
  );
};
