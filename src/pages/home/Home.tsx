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
        <StyledBox title="ASSUNTOS">
          {subjects.map((sub) => (
            <div key={sub.id}>
              <Link
                to="" // To-do - Linkar para a página de assuntos
                className="px-2 lg:px-5 bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:120%_.60em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%] hover:bg-[position:50%_95%] transition-all duration-300"
              >
                {sub.name}
              </Link>
              <span className="text-2xl">•</span>
            </div>
          ))}
        </StyledBox>
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
