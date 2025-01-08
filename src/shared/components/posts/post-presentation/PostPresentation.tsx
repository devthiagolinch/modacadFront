import { FC } from 'react';
import { PostGrid } from './view-formats/PostGrid';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import { PostList } from './view-formats/PostList';

interface IPostPresentationProps {
  variant?: 'grid' | 'list' | 'swiper';
  loading?: boolean;
  error?: boolean;
  posts?: IPostData[];
}

export const PostPresentation: FC<IPostPresentationProps> = ({ variant = 'grid', posts, loading, error }) => {
  if (loading) {
    <div>
      <p>Carregando</p>
    </div>;
  }

  if (error) {
    return (
      <div>
        <p>Erro ao carregar os posts</p>
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

  switch (variant) {
    case 'list':
      return <PostList posts={posts} />;
    case 'swiper':
      return <p>Testando</p>;
    default:
      return <PostGrid posts={posts} />;
  }
};
