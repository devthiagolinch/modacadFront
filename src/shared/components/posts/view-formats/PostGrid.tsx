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

const gridColumnsMapping = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export const PostGrid: FC<IPostGridProps> = ({ posts, columns = {} }) => {
  const { xs = 1, sm, md, lg, xl } = columns;

  const getGridClass = (columns: number | undefined, prefix: string = '') => {
    if (!columns) return '';
    return `${prefix}${gridColumnsMapping[columns as keyof typeof gridColumnsMapping]}`;
  };

  const gridClass = [
    'grid',
    getGridClass(xs),
    getGridClass(sm, 'sm:'),
    getGridClass(md, 'md:'),
    getGridClass(lg, 'lg:'),
    getGridClass(xl, 'xl:'),
    'gap-4',
  ]
    .filter(Boolean)
    .join(' ');

  console.log(gridClass);

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
