import React from 'react';
import { IPostData } from 'src/shared/api/posts/PostsService';

interface PilulaCardDTO {
  post: IPostData;
}

export const PilulaModacadCard: React.FC<PilulaCardDTO> = ({ post }) => {
  return (
    <div
      className="min-2-[150px] lg:w-[250px] border-[1px] border-[#202020] h-[100%]
        "
      key={post.id}
    >
      <div>
        <img src={post.feature_image ?? ''} alt="" className="h-[250px] object-cover" />
      </div>

      <div className="p-[10px]">
        <div className="grid">
          {post.tags &&
            Array.isArray(post.tags) &&
            post.tags?.map((t) => <span className="font-montserratLight text-[12px] -mt-[5px]">{t}</span>)}
        </div>

        <h1 className="text-[16px] font-butler_bold leading-[20px] mb-[10px] mt-[8px]">{post.title}</h1>

        <p className="text-[14px] font-montserratRegular leading-[15px] h-[45px] overflow-hidden mb-[10px]">
          {post.description}
        </p>

        <p className="text-[14px] font-montserratRegular leading-[15px] h-[45px] overflow-hidden mb-[10px]">
          {post.tags}
        </p>
      </div>
    </div>
  );
};
