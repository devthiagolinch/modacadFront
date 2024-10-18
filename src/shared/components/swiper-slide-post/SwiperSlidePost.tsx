import React from 'react';
import { IPostData } from 'src/shared/api/posts/PostsService';

interface ISwiperSlidePost {
  post: IPostData;
}

export const SwiperSlidePost: React.FC<ISwiperSlidePost> = ({ post }) => {
  return (
    <div className="border-[1px] border-[#202020]" style={{ height: '100%' }}>
      <div className="border-b-[1px] border-[#202020]">
        <img
          src={post.feature_image ?? ''}
          alt={`Imagem do ${post.title}`}
          style={{ height: '300px', objectFit: 'cover', width: '100%' }}
        />
      </div>
      <div className="p-[40px] flex-grow flex flex-col justify-between">
        <ul className="flex flex-col">
          {post?.subjects &&
            post.subjects.length > 0 &&
            post.subjects.slice(0, 3).map((subject) => (
              <li className="font-montserratLight text-[12px] -mt-[4px]" key={subject.id}>
                {subject.name}
              </li>
            ))}
        </ul>
        <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[12px]">{post.title}</h1>
        <p className="font-montserratRegular text-[17px] leading-[20px] mb-[10px] h-[60px] overflow-hidden">
          {post.description}
        </p>
      </div>
    </div>
  );
};
