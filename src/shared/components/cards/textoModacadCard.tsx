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

      <div className="lg:pt-10 lg:pl-10 lg:pr-5 lg:pb-10 p-5">
        <ul className="flex gap-3 md:h-10 h-4 w-full">
          {post?.subjects &&
            Array.isArray(post.subjects) &&
            post?.subjects.map((t, index) => (
              <li className="font-montserratLight text-base -mt-[4px]" key={index}>
                {t.name}
                {index < post.subjects.length -1 && <span className="ml-2 text-base">•</span> }
              </li>
            ))}
        </ul>

        <h1 className="font-butler font-normal text-2xl leading-7 mb-3 mt-3 md:h-16">{post?.title}</h1>

        <p className="font-montserratRegular text-[17px] leading-5 mb-[10px] h-14 overflow-hidden text-ellipsis line-clamp-3
                      md:mt-10
        ">
          {post?.description}
        </p>
      </div>
    </div>
  );
};
