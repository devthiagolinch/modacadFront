import { FC } from 'react';
import { IPostData } from '../../../../../shared/api/posts/PostsService';

import defaultImage from '../../../../../assets/imgs/default_image_300_300.jpg';
import { Link } from 'react-router-dom';

interface IPostCardProps {
  tipo: 'texto' | 'pilula';
  post: IPostData;
}

export const PostCard: FC<IPostCardProps> = ({ post, tipo }) => {
  const link = tipo === 'texto' ? `/posts/${post.id}` : `/pilulas/${post.id}`;

  return (
    <Link to={link}>
      <div className="border border-gray-950 font-montserrat">
        <img
          src={post.feature_image ?? defaultImage}
          alt={post.title}
          className="w-full aspect-video object-cover border-b border-gray-950"
        />
        <div className="p-4">
          <ul>
            {post.subjects.slice(0, 3).map((subject) => (
              <li className="font-light" key={subject.id}>
                {subject.name}
              </li>
            ))}
          </ul>
          <h1 className="font-butler text-2xl leading-7 my-3 line-clamp-2">{post.title}</h1>
          <p className="font-light line-clamp-3">{post.description}</p>
        </div>
      </div>
    </Link>
  );
};
