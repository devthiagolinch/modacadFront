import { Header } from '../../shared/components/header';
import { TextoMocadCard } from '../../shared/components/cards/textoModacadCard';
import { Footer } from '../../shared/components/footer';
import { Link } from 'react-router-dom';
import { ReadingBox } from '../../shared/components/reagindBox';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';
import { useEffect, useState } from 'react';

export function PublishedPosts() {
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
    <div className="">
      <Header />

      <div
        className="lg:flex lg:flex-col
                justify-center items-center -mb-[1px]
            "
      >
        <div className="w-full flex justify-center items-center px-[10px] mt-10 mb-10 lg:px-[115px]">
          <h1 className="font-butler font-light lg:text-7xl text-3xl md:text-6xl w-full">Textos publicados</h1>
          <div className="w-svw h-0 border-t-[1px] border-[#202020]"></div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:px-20 mt-5 flex flex-col justify-center items-center">
          {posts &&
            posts.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <TextoMocadCard post={post} />
              </Link>
            ))}
        </div>
        <div className="lg:mb-[80px] lg:mt-[60px] mt-[25px] mb-[50px] justify-center items-center flex">
          <button
            className="min-h-[60px] w-auto min-w-[210px] p-2 px-[25px]
                    border-[1px] border-[#202020]
                    font-montserrat_medium text-[22px]
                    flex flex-col justify-center items-center
                    bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_75%]"
            onClick={handleLoadMore}
          > CARREGAR MAIS</button>
        </div>
      </div>

      <ReadingBox />
      <Footer />
    </div>
  );
}
