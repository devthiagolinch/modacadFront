import React from 'react';
import { Link } from 'react-router-dom';
import { IPostData } from '../../../../shared/api/posts/PostsService';

interface IFeaturedPost {
  post: IPostData;
}

export const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  console.log(post.subjects);

  return (
    <Link to={`/posts/${post.id}`} className="hidden lg:flex lg:gap-10">
      <div className="flex flex-col w-full gap-4 lg:w-[44%] lg:p-10">
        {post?.subjects &&
          post.subjects.length > 0 &&
          post.subjects
            .map((subject) => (
              <span className="font-montserratLight text-[12px] -mt-[15px]" key={subject.id}>
                {subject.name}
              </span>
            ))
            .slice(0, 3)}
        <h1 className="text-xl lg:text-6xl">{post.title}</h1>
        <p className="text-xs lg:text-lg text-justify w-[90%]">{post.description}</p>
      </div>
      <div className=" lg:w-[60%] shadow-inner">
        <img src={post.feature_image ?? ''} alt={`Imagem do ${post.title}`} />
      </div>
    </Link>
  );
};
