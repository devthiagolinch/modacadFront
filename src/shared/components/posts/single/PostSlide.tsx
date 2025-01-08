import React from 'react';

import { IPostData } from 'src/shared/api/posts/PostsService';

import defaultImage from '../../../../assets/imgs/default_image_300_300.jpg';

interface ISwiperSlidePost {
  post: IPostData;
}

export const SwiperSlidePost: React.FC<ISwiperSlidePost> = ({ post }) => {
  return (
    <div className={`border-r border-gray-950 font-montserrat font-medium h-full overflow-hidden`}>
      {/* Imagem da publicação */}
      <div className="border-b-[1px] border-[#202020]">
        <img
          src={post.feature_image ?? defaultImage}
          alt={`Imagem do ${post.title}`}
          className={`w-full object-cover ${post.type === 'texto' ? 'aspect-video' : 'aspect-square'}`}
        />
      </div>
      {/* Conteúdo da publicação */}
      <div className="flex flex-col gap-4 p-4 md:p-8">
        {/* Assuntos */}
        <ul className="flex flex-col">
          {post?.subjects && post.subjects.length > 0 && (
            <li className="font-light text-xl">
              {post.subjects
                .slice(0, 3)
                .map((subject) => subject.name)
                .join(' • ')}
            </li>
          )}
        </ul>
        {/* Título */}
        <h1 className="font-butler text-2xl md:text-4xl font-light line-clamp-3">{post.title}</h1>
        {/* Descrição */}
        <p className="font-light text-gray-800 line-clamp-4">{post.description}</p>
      </div>
    </div>
  );
};
