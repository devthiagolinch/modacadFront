import { Swiper, SwiperSlide } from 'swiper/react';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';
import { SwiperSlidePost } from '../../swiper-slide-post/SwiperSlidePost';
import { TPostsType } from 'src/shared/services/postOptions';

interface ISwiperPosts {
  posts: IPostData[];
  postType: TPostsType;
}

export const SwiperPosts: React.FC<ISwiperPosts> = ({ posts, postType }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={posts.length >= 3 ? 3 : posts.length}
      navigation
      scrollbar={{ draggable: true }}
      style={{ height: '100%' }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id} style={{ height: '100%' }}>
          <Link to={`/${postType === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
            <SwiperSlidePost post={post} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
