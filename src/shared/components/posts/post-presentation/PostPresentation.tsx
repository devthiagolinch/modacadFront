import { FC } from 'react';
import { PostGrid } from './presentation/PostGrid';
import { IPostData } from '../../../../shared/api/posts/PostsService';

interface IPostPresentationProps {
  loading?: boolean;
  error?: boolean;
  posts?: IPostData[];
}

export const PostPresentation: FC<IPostPresentationProps> = ({ posts, loading, error }) => {
  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div>
        <h1>Erro ao carregar os posts</h1>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div>
        <h1>Nenhum post encontrado</h1>
      </div>
    );
  }

  return <PostGrid posts={posts} />;
};
