import { useEffect, useState } from 'react';

import { Footer } from '../../shared/components/footer';
import { ReadingBox } from '../../shared/components/reagindBox';

import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';

import banner from '../../assets/imgs/Banner-home.jpg';
import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';
import { Link } from 'react-router-dom';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';
import { FeaturedPost } from '../../shared/components/posts/featured-post/FeaturedPost';
import { SwiperPosts } from '../../shared/components/posts/swiper-posts/SwiperPosts';
import { CTAApp } from '../../shared/components/cta-app/CTAApp';
import { MySection } from '../../shared/components/ui/my-section/MySection';

export function Home() {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);
  const [lastPost, setLastPost] = useState<IPostData>();
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [pilulas, setPilulas] = useState<IPostData[]>([]);

  // Busca os dados da API
  useEffect(() => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setSubjects(response);
    });
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setLastPost(response.posts[0]);
      setPosts(response.posts.slice(1));
    });
    PostsService.getAll({ type: 'pilula', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPilulas(response.posts);
    });
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handler = () => setIsSmallScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handler);
    handler();

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  console.log(isSmallScreen);

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      {/* Banner da página inicial */}
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="relative py-10 lg:py-4 bg-center bg-cover md:min-h-[60vh] lg:min-h-[80vh] lg:h-[85vh] flex items-center "
      >
        {/* Hashtag Vertical Esquerda */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-2xl font-light text-gray-600 hidden md:block">
          #BLOGMODACAD
        </div>

        {/* Hashtag Vertical Direita */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 -rotate-90 text-2xl font-light text-gray-600 hidden md:block">
          #BLOGMODACAD
        </div>
        <div className="container px-4 ml-auto md:ml-[150px] mr-auto md:mr-[150px] font-montserrat font-light text-1xl md:text-2xl">
          <div className="max-w-[70%] lg:max-w-[65%] md:text-justify">
            <h1 className="font-butler font-regular text-5xl md:text-8xl mb-8">blogModacad</h1>
            <p className="mb-2">
              Textos e pílulas para confecção de moda sobre tendências, tecnologia têxtil, sustentabilidade, história da
              moda e muito mais.
            </p>
            <p className="mb-2">
              moldesModacad para agilizar a produção da indústria de confecção e beneficiar as vendas. Descubra como
              transformar sua confecção com praticidade e eficiência.
            </p>
            <p className="hidden md:hidden lg:flex">
              Trabalhamos para o sucesso de negócios de moda, multiplicando os benefícios da produtividade eficiente e
              do sucesso de mercado para estes negócios e para a sociedade à nossa volta.
            </p>
          </div>
        </div>
      </div>
      {/* CTA - Planos */}
      <ReadingBox />
      {/* Último post */}
      {lastPost && (
        <MySection
          title="Último Texto"
          titleLink={`/posts/${lastPost.id}`}
          featuredTitle={isSmallScreen}
          invisibleBottomBorder
          disableInternalPadding
        >
          <FeaturedPost post={lastPost} />
        </MySection>
      )}
      {subjects.length > 0 && (
        <MySection title="Assuntos" featuredSection>
          <div className="flex gap-1 md:gap-2 flex-wrap">
            {subjects.map((subject, index) => (
              <div key={subject.id} className="text-2xl md:text-4xl font-butler font-light flex items-center">
                <Link
                  to={`/categorias/${subject.id}`}
                  className={`highlight-link ${index === 0 || index === subjects.length - 1 ? 'font-medium' : ''}`}
                >
                  {subject.name}
                </Link>
                {index < subjects.length - 1 && <span className="ml-1 md:ml-2 md:mr-1">•</span>}
              </div>
            ))}
          </div>
        </MySection>
      )}
      {/* Textos mais lidos */}
      {posts.length > 0 && <SwiperPosts posts={posts} postType="texto" title="TEXTOS MAIS LIDOS" />}
      {/* Textos publicados */}
      {posts.length > 0 && <SwiperPosts posts={posts} postType="texto" title="TEXTOS PUBLICADOS"></SwiperPosts>}
      {/* CTA - Planos */}
      <ReadingBox />
      {/* Pilulas */}
      {pilulas.length > 0 && (
        <SwiperPosts posts={pilulas} postType="pilula" title="PILULAS MODACAD" slidesPerView={4} />
      )}
      <CTAApp />
      {/* Sobre a Telma */}
      <div id="contact"></div>
      {/* Rodapé */}
      <Footer />
    </div>
  );
}
