import { FC } from 'react';
import { IPostData } from '../../../../api/posts/PostsService';
import { PostCard } from '../card/PostCard';

interface IPostListProps {
  posts: IPostData[];
}

export const PostList: FC<IPostListProps> = ({ posts }) => {
  const postFormat = posts[0].type;

  return (
    <div className={`grid gap-4 grid-cols-${postFormat === 'texto' ? 1 : 2}`}>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
