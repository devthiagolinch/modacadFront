import React from 'react';
import { Link } from 'react-router-dom';
import { IPostData } from '../../../../shared/api/posts/PostsService';

interface IFeaturedPost {
  post: IPostData;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  return (
    <Link to={`/${post.type === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
      <div className="grid grid-cols-12 gap-4 font-montserrat">
        <div className="col-span-6 py-8 px-4 flex flex-col justify-center">
          {post.subjects.length > 0 &&
            post.subjects.slice(0, 3).map((subject) => (
              <span className="font-light text-2xl" key={subject.id}>
                {subject.name}
              </span>
            ))}
          <h3 className="text-6xl my-8 font-butler font-light">{post.title}</h3>
          <p className="text-gray-700 line-clamp-4 text-2xl font-light">{post.description}</p>
        </div>
        <div className="col-span-6 relative">
          <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} className="w-full h-full object-cover" />
          <div className="absolute top-1/2 left-[-1px] transform -translate-y-1/2 w-0 h-0 border-r-[60px] border-r-transparent border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-l-[60px] border-l-[#F1EDE9]"></div>
        </div>
      </div>
    </Link>
  );
};
