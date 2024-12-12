import { FC } from 'react';
import { IPostData } from '../../../../../shared/api/posts/PostsService';
import { PostCard } from '../card/PostCard';

interface IPostGridProps {
  posts: IPostData[];
}

export const PostGrid: FC<IPostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
