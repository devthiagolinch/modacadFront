import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../api/posts/PostsService';

export function LastPost() {
  const [post, setPost] = useState<IPostData>();

  useEffect(() => {
    PostsService.getAll('texto').then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }

      if (response.posts && response.posts.length > 0) {
        setPost(response.posts[0]);
      }
    });
  }, []);

  return (
    <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px]">
      <div className="flex justify-start items-center border-[1px] px-[8.3px] border-[#202020] -mr-[1px] -mt-[1px] -mb-[1px] align-middle">
        <p
          className="
                transform: -rotate-90 lg:w-[22px] text-nowrap"
        >
          ULTIMO POST
        </p>
      </div>

      {/** DESKTOP */}
      <Link to={`/posts/${post?.id}`} className="hidden lg:flex lg:gap-10">
        <div className="flex flex-col w-full gap-4 lg:w-[44%] lg:p-10">
          {post?.tags &&
            Array.isArray(post.tags) &&
            post?.tags.map((t, index) => (
              <span className="font-montserratLight text-[12px] -mt-[15px] " key={index}>
                {t.name}
              </span>
            ))}

          <h1 className="text-xl lg:text-6xl">{post?.title}</h1>

          <p className="text-xs lg:text-lg text-justify w-[90%]">{post?.description}</p>
        </div>

        <div className=" lg:w-[60%] shadow-inner">
          <img src={post?.feature_image ?? ''} className="h-full object-cover object-top sm:h-full" />
        </div>
      </Link>

      {/** MOBILE */}
      <Link to={`/posts/${post?.id}`} className="flex flex-col lg:hidden ">
        <div className="shadow-inner">
          <img src={post?.feature_image ?? ''} className="h-full object-cover object-top sm:h-full" />
        </div>
        <div className="flex flex-col w-full p-3">
          {post?.tags &&
            Array.isArray(post.tags) &&
            post?.tags.map((t, index) => (
              <span className="font-montserratLight text-[12px] -mt-[5px]" key={index}>
                {t.name}
              </span>
            ))}

          <h1 className="text-xl lg:text-6xl">{post?.title}</h1>

          <p className="text-xs lg:text-lg text-left w-[90%]">{post?.description}</p>
        </div>
      </Link>
    </div>
  );
}
