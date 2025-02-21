import { useEffect, useState } from 'react';

import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { Footer } from '../../../shared/components/footer/Footer';
import { useParams } from 'react-router-dom';
import { PostGrid } from '../../../shared/components/posts/view-formats/PostGrid';
import { ISubjectData, SubjectsService } from '../../../shared/api/subjects/SubjectsService';

export const PageCategoryPost = () => {
  window.scrollTo(0, 0);
  const { categoryId } = useParams<{ categoryId: string }>();

  // Categoria
  const [category, setCategory] = useState<ISubjectData | null>(null);

  // PAGINAÇÃO
  const [page, setPage] = useState(1); // Página atual
  const [totalTextoPage, setTotalTextoPage] = useState<number>();
  const [totalPiluaPage, setTotalPilulaPage] = useState<number>();

  // Textos
  const [textos, setTextos] = useState<IPostData[]>([]);
  const [hasMoreTexto] = useState(true);

  // Pílulas
  const [pilulas, setPilulas] = useState<IPostData[]>([]);
  const [hasMorePilulas] = useState(true);

  useEffect(() => {
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc', page: page, subject: categoryId }).then(
      (response) => {
        if (response instanceof Error) {
          console.error(response.message);
          return;
        }
        setTextos(response.posts);
        setTotalTextoPage(response.totalPages);
      }
    );
    PostsService.getAll({ type: 'pilula', status: 'published', order: 'desc', page: page, subject: categoryId }).then(
      (response) => {
        if (response instanceof Error) {
          console.error(response.message);
          return;
        }
        setPilulas(response.posts);
        setTotalPilulaPage(response.totalPages);
      }
    );
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setCategory(response.find((subject) => subject.id === categoryId) || null);
    });
  }, [categoryId]);

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
          <h1 className="font-butler text-4xl md:text-6xl mb-4 mt-10">{category?.name}</h1>
          <hr className="grow border-t border-gray-950" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-light text-3xl md:text-4xl mb-4">blogModacad</h2>
            <PostGrid posts={textos} columns={{ xs: 1 }} />
          </div>
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-light text-3xl md:text-4xl mb-4">pílulasModacad</h2>
            <PostGrid posts={pilulas} columns={{ xs: 2 }} />
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
      <Footer showPlans showContact={false} />
    </div>
  );
};
