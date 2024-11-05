import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { SwiperSlidePost } from '../../swiper-slide-post/SwiperSlidePost';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import { TPostsType } from 'src/shared/services/postOptions';

import 'swiper/css';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';

interface ISwiperPosts {
  posts: IPostData[];
  postType: TPostsType;
  title: string;
  slidesPerView?: number;
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts, postType, title, slidesPerView = 2 }) => {
  // Criar referências para os botões de navegação
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 font-montserrat">
        <div className="col-span-1 flex flex-col justify-center">
          <h2 className="transform -rotate-90 text-2xl text-nowrap font-light text-gray-700">{title}</h2>
        </div>
        <div className="col-span-11 border-x border-t border-gray-950">
          <Swiper
            slidesPerView={Math.min(posts.length, slidesPerView)}
            modules={[Navigation]}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // Atribuir as referências dos botões de navegação ao Swiper
              if (typeof swiper.params.navigation !== 'boolean') {
                const navigation = swiper.params.navigation;
                if (navigation) {
                  navigation.prevEl = prevRef.current;
                  navigation.nextEl = nextRef.current;
                }
              }
            }}
          >
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
        <div
          ref={prevRef}
          className="swiper-button-prev flex grow justify-center hover:bg-primary cursor-pointer py-6 border border-gray-950"
        >
          <ArrowLongLeftIcon className="size-12" />
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next flex grow justify-center hover:bg-primary cursor-pointer py-6 border-y border-r border-gray-950"
        >
          <ArrowLongRightIcon className="size-12" />
        </div>
      </div>
    </div>
  );
};
