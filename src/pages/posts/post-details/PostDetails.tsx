import { useNavigate, useParams } from 'react-router-dom';

import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { Footer } from '../../../shared/components/footer';
import { PostInfo } from './components/PostInfo';

export const PostDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<IPostData>();

  useEffect(() => {
    if (!postId) {
      navigate('/');
      return;
    }
    PostsService.getById(postId).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setPost(response);
    });
  }, [postId, navigate]);

  useEffect(() => {
    if (typeof window.instgrm !== 'undefined') {
      window.instgrm.Embeds.process();
    }
  }, [post?.content]); // Reexecuta quando o conteúdo mudar

  const renderContent = () => {
    if (!post) {
      return null;
    }

    if (post.type === 'pilula') {
      return (
        <p
          className="text-justify lg:text-xl font-montserrat font-normal prose tiptap"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />
      );
    }

    return (
      <p
        className="text-justify md:text-7xl font-montserrat leading-10 overflow-hidden font-normal prose tiptap"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />
    );
  };

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      {post && <PostInfo post={post} />}
      <div className="container mx-auto max-w-[800px] my-5 px-4">{renderContent()}</div>
      <Footer showPlans showContact={false} />
    </div>
  );
};
