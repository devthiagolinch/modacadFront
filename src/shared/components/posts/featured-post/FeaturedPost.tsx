import React from 'react';
import { Link } from 'react-router-dom';
import { IPostData } from '../../../../shared/api/posts/PostsService';

interface IFeaturedPost {
  post: IPostData;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  return (
    <Link to={`/${post.type === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
      <div className="flex flex-col-reverse md:flex-row gap-2 font-montserrat">
        <div className="py-8 px-4 flex flex-col justify-center gap-4">
          {post.subjects.length > 0 &&
            post.subjects.slice(0, 3).map((subject) => (
              <span className="font-light text-2xl" key={subject.id}>
                {subject.name}
              </span>
            ))}
          <h3 className="text-4xl md:text-6xl font-butler font-light line-clamp-2">{post.title}</h3>
          <p className="text-gray-700 line-clamp-4 text-2xl font-light line-clamp-4">{post.description}</p>
        </div>
        <div className="relative">
          <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} className="w-full h-full object-cover" />
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
