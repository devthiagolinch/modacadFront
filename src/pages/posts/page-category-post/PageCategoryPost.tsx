import { useEffect, useState } from 'react';

import { PostPresentation } from '../../../shared/components/posts/post-presentation/PostPresentation';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { Footer } from '../../../shared/components/footer';
import { ReadingBox } from '../../../shared/components/reagindBox';
import { CTAApp } from '../../../shared/components/cta-app/CTAApp';
import { useParams } from 'react-router-dom';

export const PageCategoryPost = () => {
  window.scrollTo(0, 0);
  const { categoryId } = useParams<{ categoryId: string }>();

  // PAGINAÇÃO
  const [page, setPage] = useState(1); // Página atual
  const [totalTextoPage, setTotalTextoPage] = useState<number>(); // Controle de paginas dos textos
  const [totalPiluaPage, setTotalPilulaPage] = useState<number>(); // Controle de paginas das pilulas

  // Textos
  const [textos, setTextos] = useState<IPostData[]>([]);
  const [isLoadingTextos, setIsLoadingTextos] = useState(false);
  const [hasMoreTexto] = useState(true); // Controle de mais dados para carregar
  const [errorTextos, setErrorTextos] = useState(false);

  // Pílulas
  const [pilulas, setPilulas] = useState<IPostData[]>([]);
  const [isLoadingPilulas, setIsLoadingPilulas] = useState(false);
  const [hasMorePilulas] = useState(true); // Controle de mais dados para carregar
  const [errorPilulas, setErrorPilulas] = useState(false);

  useEffect(() => {
    setIsLoadingTextos(true);
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc', page: page, subject: categoryId }).then(
      (response) => {
        if (response instanceof Error) {
          console.error(response.message);
          setErrorTextos(true);
          setIsLoadingTextos(false);
          return;
        }
        setTextos(response.posts);
        setTotalTextoPage(response.totalPages);
        setIsLoadingTextos(false);
        setErrorTextos(false);
      }
    );
    PostsService.getAll({ type: 'pilula', status: 'published', order: 'desc', page: page, subject: categoryId }).then(
      (response) => {
        if (response instanceof Error) {
          console.error(response.message);
          setErrorPilulas(true);
          setIsLoadingPilulas(false);
          return;
        }
        setPilulas(response.posts);
        setTotalPilulaPage(response.totalPages);
        setIsLoadingPilulas(false);
        setErrorPilulas(false);
      }
    );
  }, []);

  const handleLoadMore = () => {
    if (hasMorePilulas && hasMoreTexto) {
      setPage((prevPage) => prevPage + 1); // Incrementa o número da página
    }
  };

  return (
    <div>
      <PublicHeader />
      <div className="container mx-auto p-4">
        <div className="flex gap-2 items-center">
          <h1 className="font-butler text-4xl md:text-6xl mb-4 mt-10">Tecidos e Materiais</h1>
          <hr className="grow border-t border-gray-950" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-light text-3xl md:text-4xl mb-4">blogModacad</h2>
            <PostPresentation
              posts={textos}
              loading={isLoadingTextos}
              error={errorTextos}
              variant="list"
              tipo="texto"
            />
          </div>
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-light text-3xl md:text-4xl mb-4">pílulasModacad</h2>
            <PostPresentation
              posts={pilulas}
              loading={isLoadingPilulas}
              error={errorPilulas}
              variant="list"
              tipo="pilula"
            />
          </div>
        </div>
        <div className="lg:mb-[80px] lg:mt-[60px] mt-[25px] mb-[50px] justify-center items-center flex">
          {totalPiluaPage && totalTextoPage != undefined ? (
            totalPiluaPage && totalTextoPage > 1 ? (
              <button
                className="min-h-[60px] w-auto min-w-[210px] p-2 px-[25px]
                        border-[1px] border-[#202020]
                        font-montserrat_medium text-[22px]
                        flex flex-col justify-center items-center
                        bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_75%]"
                onClick={handleLoadMore}
              >
                {' '}
                CARREGAR MAIS
              </button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </div>
      </div>
      <ReadingBox />
      <CTAApp />
      <Footer />
    </div>
  );
};
