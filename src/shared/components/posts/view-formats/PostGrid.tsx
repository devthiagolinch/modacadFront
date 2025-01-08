import { FC } from 'react';

import { IPostData } from '../../../api/posts/PostsService';
import { PostCard } from '../single/PostCard';

interface IGridColumns {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface IPostGridProps {
  posts: IPostData[];
  columns?: IGridColumns;
}

export const PostGrid: FC<IPostGridProps> = ({ posts, columns = {} }) => {
  const { xs = 1, sm, md, lg, xl } = columns;

  const gridClass = [
    `grid grid-cols-${xs}`,
    sm ? `sm:grid-cols-${sm}` : '',
    md ? `md:grid-cols-${md}` : '',
    lg ? `lg:grid-cols-${lg}` : '',
    xl ? `xl:grid-cols-${xl}` : '',
    'gap-4',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
