import { Footer } from '../../../shared/components/footer';
import { Link } from 'react-router-dom';
import { CTAPlans } from '../../../shared/components/cta/CTAPlans';
import { PilulaModacadCard } from '../../../shared/components/cards/pilulasModacadCard';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';

export function PublishedPills() {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [page, setPage] = useState(2); // Página atual
  const [hasMore, setHasMore] = useState(true); // Controle de mais dados para carregar
  const [loading, setLoading] = useState(false); // Controle do estado de carregamento

  const loadPosts = async (currentPage: number) => {
    setLoading(true);
    const response = await PostsService.getAll({
      type: 'pilula',
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
    PostsService.getAll({ type: 'pilula', status: 'published' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response.posts);
    });
  }, []);

  return (
    <div className="">
      <PublicHeader />

      <div
        className="lg:flex lg:flex-col
                justify-center items-center -mb-[1px]
            "
      >
        <div className="w-full flex items-center px-[10px] mt-10 mb-10 lg:px-[115px]">
          <h1 className="font-butler font-light text-2xl md:text-6xl">Pílulas publicadas</h1>
          <div className="w-[40%] lg:w-[65%] h-0 border-t-[1px] ml-[20px] border-[#202020]"></div>
        </div>

        <div
          className="lg:grid lg:grid-cols-4 mt-5 flex-col justify-center items-center lg:px-20
                    grid grid-cols-2
                "
        >
          {posts.map((post) => (
            <Link to={`/pilulas/${post.id}`} key={post.id}>
              <PilulaModacadCard post={post} />
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
          >
            {' '}
            CARREGAR MAIS
          </button>
        </div>
      </div>

      <CTAPlans />
      <Footer />
    </div>
  );
}
