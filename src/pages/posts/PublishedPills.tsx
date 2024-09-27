import { Header } from '../../shared/components/header';
import { Footer } from '../../shared/components/footer';
import { Link } from 'react-router-dom';
import { ReadingBox } from '../../shared/components/reagindBox';
import { PilulaModacadCard } from '../../shared/components/cards/pilulasModacadCard';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';

export function PublishedPills() {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    PostsService.getAll('pilula').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPosts(response);
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
        <div className="w-full flex items-center px-[10px] mt-5 lg:px-[115px]">
          <h1 className="font-butler_ultra_light text-[26px] md:text-[40px]">Pilulas publicadas</h1>
          <div className="w-[40%] lg:w-[65%] h-0 border-t-[1px] ml-[20px] border-[#202020]"></div>
        </div>

        <div
          className="lg:grid lg:grid-cols-4 mt-5 flex-col justify-center items-center lg:px-20
                    grid grid-cols-2
                "
        >
          {posts.map((post) => (
            <Link to={`/posts/pills/${post.id}`} key={post.id}>
              <PilulaModacadCard post={post} />
            </Link>
          ))}
        </div>
        {/* <div className="lg:mb-[80px] lg:mt-[60px] mt-[25px] mb-[50px] justify-center items-center flex">
          <Button title={'Carregar mais'} active={false} />
        </div> */}
      </div>

      <ReadingBox />
      <Footer />
    </div>
  );
}
