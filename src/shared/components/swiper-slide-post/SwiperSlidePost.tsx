import React from 'react';
import { IPostData } from 'src/shared/api/posts/PostsService';

interface ISwiperSlidePost {
  post: IPostData;
}

export const SwiperSlidePost: React.FC<ISwiperSlidePost> = ({ post }) => {
  return (
    <div className="min-w-[344px] max-w-full lg:min-w-[500px] border-[1px] border-[#202020]">
      <div className="border-b-[1px] border-[#202020]">
        <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} />
      </div>
      <div className="pt-[40px] pl-[40px] pr-[20px] pb-[40px]">
        <ul className="flex flex-col">
          {post?.subjects &&
            post.subjects.length > 0 &&
            post.subjects
              .map((subject) => (
                <li className="font-montserratLight text-[12px] -mt-[4px]" key={subject.id}>
                  {subject.name}
                </li>
              ))
              .slice(0, 3)}
        </ul>
        <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[12px]">{post.title}</h1>
        <p className="font-montserratRegular text-[17px] leading-[20px] mb-[10px] h-[60px] overflow-hidden">
          {post.description}
        </p>
      </div>
    </div>
  );
};
