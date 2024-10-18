import React from 'react';
import { Link } from 'react-router-dom';
import { IPostData } from '../../../../shared/api/posts/PostsService';
import { TPostsType } from '../../../../shared/services/postOptions';

interface IFeaturedPost {
  post: IPostData;
  postType: TPostsType;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post, postType }) => {
  return (
    <Link to={`/${postType === 'texto' ? 'posts' : 'pilulas'}/${post.id}`} className="hidden lg:flex lg:gap-10">
      <div className="flex flex-col w-full gap-4 lg:w-[44%] lg:p-10">
        {post?.subjects &&
          post.subjects.length > 0 &&
          post.subjects.slice(0, 3).map((subject) => (
            <span className="font-montserratLight text-[12px] -mt-[15px]" key={subject.id}>
              {subject.name}
            </span>
          ))}
        <h1 className="text-xl lg:text-6xl">{post.title}</h1>
        <p className="text-xs lg:text-lg text-justify w-[90%]">{post.description}</p>
      </div>
      <div className=" lg:w-[60%] shadow-inner">
        <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} />
      </div>
    </Link>
  );
};
