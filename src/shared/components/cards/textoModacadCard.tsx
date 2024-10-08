import { IPostData } from '../../../shared/api/posts/PostsService';
import React from 'react';

interface TextosCardDTO {
  post: IPostData;
}

export const TextoMocadCard: React.FC<TextosCardDTO> = ({ post }) => {
  return (
    <div className="min-w-[344px] max-w-full lg:min-w-[500px] border-[1px] border-[#202020]">
      <div className=" border-b-[1px] border-[#202020]">
        <img src={post?.feature_image ?? ''} alt="" className="h-[150px] lg:h-[250px] w-full object-cover" />
      </div>

      <div className="pt-[40px] pl-[40px] pr-[20px] pb-[40px]">
        <ul className="flex flex-col">
          {post?.tags &&
            Array.isArray(post.tags) &&
            post?.tags.map((t, index) => (
              <li className="font-montserratLight text-[12px] -mt-[4px]" key={index}>
                {t.name}
              </li>
            ))}
        </ul>

        <h1 className="font-butler_regular text-[25px] leading-[30px] mb-[13px] mt-[12px]">{post?.title}</h1>

        <p className="font-montserratRegular text-[17px] leading-[20px] mb-[10px] h-[60px] overflow-hidden">
          {post?.description}
        </p>
      </div>
    </div>
  );
};
