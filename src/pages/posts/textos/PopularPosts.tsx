import { Footer } from '../../../shared/components/footer';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { useEffect, useState } from 'react';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { PostGrid } from '../../../shared/components/posts/view-formats/PostGrid';

export function PopularPosts() {
  const [posts, setPosts] = useState<IPostData[]>();
  const [page, setPage] = useState(2); // Página atual
  const [hasMore, setHasMore] = useState(true); // Controle de mais dados para carregar
  const [loading, setLoading] = useState(false); // Controle do estado de carregamento

  const loadPosts = async (currentPage: number) => {
    setLoading(true);
    const response = await PostsService.getAll({
      type: 'texto',
      status: 'published',
      order: 'desc',
      page: currentPage, // Envia o número da página na requisição
    });

    if (response instanceof Error) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    if (response.posts.length === 0) {
      setHasMore(false); // Não há mais posts para carregar
    } else {
      setPosts((prevPosts) => [...(prevPosts || []), ...response.posts]); // Concatena os novos posts
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPosts(page); // Carregar a página inicial
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Incrementa o número da página
    }
  };

  useEffect(() => {
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response.posts);
    });
  }, []);

  return (
    <div>
      <PublicHeader />
      <div className="flex items-center px-4 my-8 container mx-auto gap-4">
        <h1 className="font-butler font-light text-2xl md:text-6xl">Textos mais lidos</h1>
        <div className="flex grow h-0 border-t border-[#202020]"></div>
      </div>

      {posts && posts.length > 0 && (
        <div className="container mx-auto px-4">
          <PostGrid posts={posts} columns={{ md: 2, lg: 3 }} />
        </div>
      )}

      <div className="container mx-auto px-4 flex justify-center my-8">
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
      </div>
      <Footer showPlans showContact={false} />
    </div>
  );
}
