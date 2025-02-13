import { Footer } from '../../../shared/components/footer';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { useEffect, useState } from 'react';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { PostGrid } from '../../../shared/components/posts/view-formats/PostGrid';

export function PopularPosts() {
  const [posts, setPosts] = useState<IPostData[]>();

  const loadPosts = async () => {
    const response = await PostsService.getMostReadPosts();

    if (response instanceof Error) {
      console.error(response.message);
      return;
    }

    setPosts(response.posts);
  };

  useEffect(() => {
    loadPosts(); // Carregar a página inicial
  }, []);

  return (
    <div>
      <PublicHeader />
      <div className="flex items-center px-4 my-8 container mx-auto gap-4">
        <h1 className="font-butler font-light text-2xl md:text-6xl">Textos mais lidos</h1>
        <div className="flex grow h-0 border-t border-[#202020]"></div>
      </div>

      {posts && posts.length > 0 && (
        <div className="container mx-auto px-4 my-5">
          <PostGrid posts={posts} columns={{ md: 2, lg: 3 }} />
        </div>
      )}

      <Footer showPlans showContact={false} />
    </div>
  );
}
