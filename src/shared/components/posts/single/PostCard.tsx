import { FC } from 'react';

import { Link } from 'react-router-dom';

import { IPostData } from '../../../api/posts/PostsService';

import defaultImage from '../../../../assets/imgs/default_image_300_300.jpg';

interface IPostCardProps {
  post: IPostData;
}

export const PostCard: FC<IPostCardProps> = ({ post }) => {
  const link = post.type === 'texto' ? `/posts/${post.id}` : `/pilulas/${post.canonicalUrl}`;

  return (
    <Link to={link}>
      <div className="border border-gray-950 font-montserrat h-full">
        <img
          src={post.feature_image ?? defaultImage}
          alt={post.title}
          className={`w-full object-cover border-b border-gray-950 ${post.type === 'texto' ? 'aspect-video' : 'aspect-square'}`}
        />
        <div className="p-4">
          <ul>
            {post.subjects.slice(0, 3).map((subject) => (
              <li className="font-light md:text-xl" key={subject.id}>
                {subject.name}
              </li>
            ))}
          </ul>
          <h1 className="font-butler text-3xl md:text-5xl my-3 line-clamp-2">{post.title}</h1>
          <p className="font-light text-xl md:text-2xl line-clamp-3">{post.description}</p>
        </div>
      </div>
    </Link>
  );
};
