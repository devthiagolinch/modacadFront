import React from 'react';

import { Link } from 'react-router-dom';

import { IPostData } from '../../../api/posts/PostsService';

import defaultImage from '../../../../assets/imgs/default_image_300_300.jpg';

interface IFeaturedPost {
  post: IPostData;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  return (
    <Link to={`/${post.type === 'texto' ? 'posts' : 'pilulas'}/${post.canonicalUrl}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 font-montserrat gap-4">
        <div className="px-4 py-8 flex flex-col justify-center gap-4 order-1 md:order-[-1] col-span-5">
          <div className="flex flex-col gap-0">
            {post.subjects.length > 0 &&
              post.subjects.slice(0, 3).map((subject) => (
                <span className="font-medium" key={subject.id}>
                  {subject.name}
                </span>
              ))}
          </div>
          <h3 className="text-5xl xl:text-6xl font-butler font-light">{post.title}</h3>
          <p className="text-gray-700 line-clamp-4 font-light line-clamp-5">{post.description}</p>
        </div>
        <div className="relative col-span-7">
          <img
            src={post.feature_image ?? defaultImage}
            alt={`Imagem do ${post.title}`}
            className="w-full h-full object-cover aspect-video"
          />
          <div
            className="
              absolute 
              bottom-[0] left-1/2 transform -translate-x-1/2 
              md:top-1/2 md:left-[-1px] md:bottom-auto md:transform md:-translate-y-1/2 md:translate-x-0 
              w-0 h-0 
              border-l-[60px] border-l-transparent 
              border-t-[60px] border-t-transparent 
              border-r-[60px] border-r-transparent 
              border-b-[60px] 
              border-b-[#F1EDE9] 
              md:border-l-[#F1EDE9] md:border-b-transparent"
          ></div>
        </div>
      </div>
    </Link>
  );
};
