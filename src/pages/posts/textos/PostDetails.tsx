import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import "../../../assets/css/tiptap.css";


import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';

import { Footer } from '../../../shared/components/footer';
import { PostDeskTopHeader } from './components/PostDesktopHeader';
import { PostMobileHeader } from './components/PostMobileHeader';

import "../../../assets/css/tiptap.css";
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';

export function PostDetails() {
  window.scrollTo(0,0)
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPostData | undefined>(undefined);

  const meta = Array.isArray(post?.meta) && post?.meta.length > 0 ? post?.meta[0] : {};
  const feature_image_caption = meta.feature_image_caption;

  useEffect(() => {
    if (postId) {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
          return;
        }
        setPost(response);
      });
    } else {
      navigate('/');
    }
  }, [postId, navigate]);

  useEffect(() => {
    const scriptSrc = "//www.instagram.com/embed.js";
    const existingScript = document.querySelector(`script[src='${scriptSrc}']`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, [post?.content]);

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      <PostDeskTopHeader post={post} feature_image_caption={feature_image_caption} />
      <PostMobileHeader post={post} feature_image_caption={feature_image_caption} />

      <div className="lg:pt-12 lg:w-full flex justify-center items-center">
        <p
          className="text-justify md:text-7xl lg:min-w-[970px] w-full px-5 font-montserrat leading-10 overflow-hidden font-normal prose tiptap"
          dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
        />
      </div>
      <Footer />
    </div>
  );

}
