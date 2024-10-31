import { useEffect, useState } from 'react';

import { Footer } from '../../shared/components/footer';
import { ReadingBox } from '../../shared/components/reagindBox';

import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';

import banner from '../../assets/imgs/Banner-home.jpg';
import { PublicHeader } from '../../shared/components/header/PublicHeader';
import { Link } from 'react-router-dom';
import { StyledBox } from '../../shared/components/styled-box/StyledBox';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';
import { FeaturedPost } from '../../shared/components/posts/featured-post/FeaturedPost';
import { SwiperPosts } from '../../shared/components/posts/swiper-posts/SwiperPosts';

export function Home() {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);
  const [lastPost, setLastPost] = useState<IPostData>();
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [pilulas, setPilulas] = useState<IPostData[]>([]);

  useEffect(() => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setSubjects(response);
    });
    PostsService.getAll('texto').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setLastPost(response.posts[0]);
      setPosts(response.posts.slice(1));
    });
    PostsService.getAll('pilula').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPilulas(response.posts);
    });
  }, []);

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      {/* Banner da página inicial */}
      <div>
        <img src={banner} alt="" className="min-w-full max-h-[650px] object-cover" />
      </div>
      <ReadingBox />
      {lastPost && <FeaturedPost post={lastPost} postType="texto" title="ÚLTIMO TEXTO" />}
      {subjects.length > 0 && (
        <div className="flex border border-gray-800 mb-[-1px] py-16">
          <div className="flex justify-start items-center">
            <p className="transform -rotate-90 text-2xl text-nowrap font-light text-gray-700">ASSUNTOS</p>
          </div>
          <div className="flex flex-wrap gap-4 p-6">
            {subjects.map((sub, index) => (
              <div key={sub.id} className="text-5xl font-butler font-light">
                <Link to="" className="highlight-link">
                  {sub.name}
                </Link>
                {index < subjects.length - 1 && <span className="ml-4 mr-2">•</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      {posts.length > 0 && (
        <StyledBox title="TEXTOS MAIS LIDOS">
          <SwiperPosts posts={posts} postType="texto"></SwiperPosts>
        </StyledBox>
      )}
      {posts.length > 0 && (
        <StyledBox title="TEXTOS PUBLICADOS">
          <SwiperPosts posts={posts} postType="texto"></SwiperPosts>
        </StyledBox>
      )}
      <ReadingBox />
      {pilulas.length > 0 && (
        <StyledBox title="PILULAS MODACAD">
          <SwiperPosts posts={pilulas} postType="pilula" />
        </StyledBox>
      )}
      <Footer />
    </div>
  );
}
