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
        <div className="flex flex-col h-10">
          {post.subjects &&
            Array.isArray(post.subjects) &&
            post.subjects?.map((t, index) => (
              <span className="font-montserratLight text-sm -mt-1" key={index}>
                {t.name}
              </span>
            ))}
        </div>

        <h1 className="text-lg font-butler_bold leading-5 mb-[10px] mt-3 h-16">{post.title}</h1>

        <p className="font-montserratRegular text-base leading-5 mb-[10px] h-14 overflow-hidden text-ellipsis line-clamp-3">
          {post.description}
        </p>
      </div>
    </div>
  );
};
