import { useEffect, useState } from 'react';

import { PostPresentation } from '../../../shared/components/posts/post-presentation/PostPresentation';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';

export const PageCategoryPost = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        setError(true);
        setLoading(false);
        return;
      }
      setPosts(response.posts);
      setLoading(false);
      setError(false);
    });
  }, []);

  return (
    <div>
      <PublicHeader />
      <PostPresentation posts={posts} loading={loading} error={error} />
    </div>
  );
};
