import { FC } from 'react';
import { IPostData } from '../../../../../shared/api/posts/PostsService';
import { PostCard } from '../card/PostCard';

interface IPostListProps {
  tipo: 'texto' | 'pilula';
  posts: IPostData[];
}

export const PostList: FC<IPostListProps> = ({ posts, tipo }) => {
  return (
    <div className={`grid gap-4 grid-cols-${tipo === 'texto' ? 1 : 2}`}>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} tipo={tipo} />
      ))}
    </div>
  );
};
