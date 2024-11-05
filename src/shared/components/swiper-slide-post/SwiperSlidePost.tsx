import React from 'react';
import { IPostData } from 'src/shared/api/posts/PostsService';

interface ISwiperSlidePost {
  post: IPostData;
}

export const SwiperSlidePost: React.FC<ISwiperSlidePost> = ({ post }) => {
  return (
    <div className={`border-r border-gray-950 font-montserrat font-medium h-full`}>
      <div className="border-b-[1px] border-[#202020]">
        <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} className="h-[300px] object-cover w-full" />
      </div>
      <div className="p-[40px] flex-grow flex flex-col justify-between">
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
        <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[12px]">{post.title}</h1>
        <p className="font-montserratRegular text-[17px] leading-[20px] mb-[10px] h-[60px] overflow-hidden">
          {post.description}
        </p>
      </div>
    </div>
  );
};
