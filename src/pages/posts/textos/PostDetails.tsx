import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../assets/css/tiptap.css';

import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';

import { Footer } from '../../../shared/components/footer';
import { PostDeskTopHeader } from './components/PostDesktopHeader';
import { PostMobileHeader } from './components/PostMobileHeader';

import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';

export function PostDetails() {
  window.scrollTo(0, 0);
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPostData | undefined>(undefined);

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
    if (!post?.content) return;

    // Aguarde um pequeno delay para garantir que o conteúdo foi renderizado
    setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      }
    }, 500);
  }, [post?.content]);

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      <PostDeskTopHeader post={post} />
      <PostMobileHeader post={post} />

      <div className="lg:pt-12 lg:w-full flex justify-center items-center mb-16">
        <div
          className="text-justify md:text-7xl lg:min-w-[970px] w-full px-5 font-montserrat leading-10 overflow-hidden font-normal prose tiptap"
          dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
        />
      </div>
      <Footer showPlans showContact={false} />
    </div>
  );
}