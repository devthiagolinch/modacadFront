import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';
import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';
import { SwiperPosts } from '../../shared/components/posts/view-formats/PostSwiper';
import { FeaturedPost } from '../../shared/components/posts/featured/FeaturedPost';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';
import { MySection } from '../../shared/components/ui/my-section/MySection';
import { CTAPlans } from '../../shared/components/cta/CTAPlans';
import { Footer } from '../../shared/components/footer';
import { useScreenSize } from '../../shared/hook/useScreenSize';

import bannerDesktop from '../../assets/imgs/hero/telma-foto-topo-3-corte.jpg';
import bannerMobile from '../../assets/imgs/hero/mobile-telma-foto-topo.jpg';
import imagemTelma from '../../assets/imgs/model.jpg';

export function Home() {
  const { isSmallScreen, isTablet } = useScreenSize();

  const [subjects, setSubjects] = useState<ISubjectData[]>([]);
  const [lastPost, setLastPost] = useState<IPostData>();
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [mostReadPosts, setMostReadPosts] = useState<IPostData[]>([]);
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
    PostsService.getMostReadPosts().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setMostReadPosts(response.posts);
    });
  }, []);

  return (
    <div className="mx-auto h-screen relative">
      <PublicHeader />
      {/* Banner da página inicial */}
      <div
        style={{ backgroundImage: `url(${isTablet ? bannerMobile : bannerDesktop})` }}
        className="relative py-8 bg-contain bg-right-bottom bg-no-repeat z-[-1] min-h-[80vh] flex items-center"
      >
        <div className="grid grid-cols-12">
          <div className="relative col-span-2 md:col-span-1 flex items-center justify-center hidden md:flex">
            <div className="-rotate-90 font-montserrat text-lg text-gray-600">#BLOGMODACAD</div>
          </div>
          <div className="relative col-span-12 md:col-span-10">
            <div className="max-w-[70%] px-8 md:px-4">
              <h1 className="font-butler font-regular text-4xl md:text-8xl mb-8">blogModacad</h1>
              <div className="font-montserrat font-light text-base md:text-2xl text-gray-800">
                <p className="mb-2">
                  Textos e pílulas para confecção de moda sobre tendências, tecnologia têxtil, sustentabilidade,
                  história da moda e muito mais.
                </p>
                <p className="mb-2">
                  moldesModacad para agilizar a produção da indústria de confecção e beneficiar as vendas. Descubra como
                  transformar sua confecção com praticidade e eficiência.
                </p>
                <p className="hidden lg:flex">
                  Trabalhamos para o sucesso de negócios de moda, multiplicando os benefícios da produtividade eficiente
                  e do sucesso de mercado para estes negócios e para a sociedade à nossa volta.
                </p>
              </div>
            </div>
          </div>
          <div className="relative col-span-2 md:col-span-1 flex items-center justify-center hidden md:flex">
            <div className="-rotate-90 text-lg font-montserrat text-gray-600">#BLOGMODACAD</div>
          </div>
        </div>
      </div>
      {/* CTA - Planos */}
      <CTAPlans />
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
        <MySection title="Assuntos" featuredSection invisibleBottomBorder>
          <div className="flex gap-1 md:gap-2 flex-wrap py-16">
            {subjects.map((subject, index) => (
              <div key={subject.id} className="text-2xl md:text-4xl font-butler font-light flex items-center">
                <Link to={`/categorias/${subject.id}`} className={`highlight-link ${index === 0 ? 'font-medium' : ''}`}>
                  {subject.name}
                </Link>
                {index < subjects.length - 1 && <span className="ml-1 md:ml-2 md:mr-1">•</span>}
              </div>
            ))}
          </div>
        </MySection>
      )}
      {/* Textos mais lidos */}
      {mostReadPosts.length > 0 && (
        <MySection title="Textos mais lidos" titleLink="/posts/popular" disableInternalPadding invisibleBottomBorder>
          <SwiperPosts
            posts={mostReadPosts}
            slidesPerView={isSmallScreen ? 1.25 : 2}
            redirectSeeMore="/posts/popular"
          />
        </MySection>
      )}
      {/* Textos publicados */}
      {posts.length > 0 && (
        <MySection title="Textos Publicados" titleLink="/posts" disableInternalPadding invisibleBottomBorder>
          <SwiperPosts posts={posts} slidesPerView={isSmallScreen ? 1.25 : 2} redirectSeeMore="/posts" />
        </MySection>
      )}
      {/* CTA - Planos */}
      <CTAPlans />
      {/* Pilulas */}
      {pilulas.length > 0 && (
        <MySection title="PÍLULAS MODACAD" titleLink="/pilulas" disableInternalPadding invisibleBottomBorder>
          <SwiperPosts posts={pilulas} slidesPerView={isSmallScreen ? 1.25 : 4} redirectSeeMore="/pilulas" />
        </MySection>
      )}
      {/* Sobre a Telma */}
      <MySection title="QUEM É TELMA BARCELLOS?" invisibleBottomBorder disableInternalPadding featuredTitle>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4">
            <img src={imagemTelma} alt="" className="aspect-square h-full object-cover" />
          </div>
          <div className="col-span-12 lg:col-span-8 flex justify-center flex-col gap-4 font-montserrat font-light text-1xl p-2 md:p-8">
            <h3 className="font-butler text-4xl">Quem é Telma Barcellos?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae varius velit. Integer risus ligula,
              varius at varius lobortis, vestibulum ac eros. In justo tellus, mollis ac quam eget, ornare laoreet elit.
              Suspendisse potenti. Aenean augue lectus, fringilla sed scelerisque nec, elementum at nisi. Ut porttitor
              fringilla turpis a elementum. Sed consequat sapien et augue posuere, vestibulum interdum velit venenatis.
              Vivamus id mauris euismod, iaculis felis vitae, imperdiet neque.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae varius velit. Integer risus ligula,
              varius at varius lobortis, vestibulum ac eros. In justo tellus, mollis ac quam eget, ornare laoreet elit.
              Suspendisse potenti. Aenean augue lectus, fringilla sed scelerisque nec, elementum at nisi. Ut porttitor
              fringilla turpis a elementum. Sed consequat sapien et augue posuere, vestibulum interdum velit venenatis.
              Vivamus id mauris euismod, iaculis felis vitae, imperdiet neque.
            </p>
            <div>
              <button className="border border-gray-950 px-4 py-2 font-medium highlight-link">Saber mais</button>
            </div>
          </div>
        </div>
      </MySection>
      {/* Rodapé */}
      <Footer />
    </div>
  );
}
