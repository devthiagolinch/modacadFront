import React from 'react';
import { Link } from 'react-router-dom';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import { TPostsType } from '../../../../shared/services/postOptions';

interface IFeaturedPost {
  post: IPostData;
  postType: TPostsType;
  title: string;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post, postType, title }) => {
  return (
    <Link to={`/${postType === 'texto' ? 'posts' : 'pilulas'}/${post.id}`}>
      <div className="grid grid-cols-12 gap-4 font-montserrat">
        {/* Título da seção */}
        <div className="col-span-1 flex flex-col justify-center">
          <h2 className="transform -rotate-90 text-2xl whitespace-nowrap font-light text-gray-700">{title}</h2>
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          {/* Assuntos da publicação */}
          {post.subjects.length > 0 &&
            post.subjects.slice(0, 3).map((subject) => (
              <span className="font-light text-2xl" key={subject.id}>
                {subject.name}
              </span>
            ))}
          {/* Título da publicação */}
          <h3 className="text-6xl mb-8 font-butler font-light">{post.title}</h3>
          {/* Descrição da publicação */}
          <p className="text-gray-700 line-clamp-4 text-2xl font-light">{post.description}</p>
        </div>
        <div className="col-span-7 relative">
          {/* Imagem da publicação */}
          <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} className="w-full h-full object-cover" />
          {/* Triângulo decorativo na borda esquerda ao centro */}
          <div className="absolute top-1/2 left-[-1px] transform -translate-y-1/2 w-0 h-0 border-r-[60px] border-r-transparent border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-l-[60px] border-l-[#F1EDE9]"></div>
        </div>
      </div>
    </Link>
  );
};
