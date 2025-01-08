import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { IPostData } from '../../../api/posts/PostsService';
import { SwiperSlidePost } from '../single/PostSlide';

import 'swiper/css';
import { useId } from 'react';

interface ISwiperPosts {
  posts: IPostData[];
  slidesPerView?: number;
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts, slidesPerView = 2 }) => {
  const rawId = useId();
  const sanitizedId = rawId.replace(/[:.]/g, '-');
  const prevButtonClass = `swiper-button-prev-${sanitizedId}`;
  const nextButtonClass = `swiper-button-next-${sanitizedId}`;

  return (
    <div>
      <div className="border-x border-gray-800">
        <Swiper
          slidesPerView={Math.min(posts.length, slidesPerView)}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
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
          className={`${prevButtonClass} flex grow justify-center hover:bg-primary cursor-pointer py-6 border-t border-l border-r border-gray-950`}
        >
          <ArrowLongLeftIcon className="size-12" />
        </div>
        <div
          className={`${nextButtonClass} flex grow justify-center hover:bg-primary cursor-pointer py-6 border-t border-r border-gray-950`}
        >
          <ArrowLongRightIcon className="size-12" />
        </div>
      </div>
    </div>
  );
};
