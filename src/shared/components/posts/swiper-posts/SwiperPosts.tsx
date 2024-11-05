import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { SwiperSlidePost } from '../../swiper-slide-post/SwiperSlidePost';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import { TPostsType } from 'src/shared/services/postOptions';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

interface ISwiperPosts {
  posts: IPostData[];
  postType: TPostsType;
  title: string;
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts, postType, title }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 font-montserrat">
        <div className="col-span-1 flex flex-col justify-center">
          <h2 className="transform -rotate-90 text-2xl text-nowrap font-light text-gray-700">{title}</h2>
        </div>
        <div className="col-span-11 border-x border-t border-gray-950">
          <Swiper slidesPerView={Math.min(posts.length, 2)}>
            {posts.map((post) => (
              <SwiperSlide key={post.id} style={{ height: 'auto' }}>
                <Link to={`/${postType === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
                  <SwiperSlidePost post={post} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Menu de navegação */}
      <div className="swiper-navigation flex">
        <div className="swiper-button-prev flex grow justify-center hover:bg-primary cursor-pointer py-6 border border-gray-950">
          <ArrowLongLeftIcon className="size-12" />
        </div>
        <div className="swiper-button-next flex grow justify-center hover:bg-primary cursor-pointer py-6 border-y border-r border-gray-950">
          <ArrowLongRightIcon className="size-12" />
        </div>
      </div>
    </div>
  );
};
