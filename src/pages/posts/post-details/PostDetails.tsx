import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { Footer } from '../../../shared/components/footer/Footer';
import { useUser } from '../../../shared/contexts';
import { PostInfo } from './components/PostInfo';
import { checkPostAccess } from '../../../shared/utils/permissionsUtils';
import { useAuthDialog } from '../../../shared/contexts/AuthDialogContext';

const LoginPrompt = () => {
  const { openDialog } = useAuthDialog();

  return (
    <div className="p-4 bg-gray-200 text-center rounded">
      <p>Para ver o conteúdo completo, faça login.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => openDialog('login')}>
        Entrar
      </button>
    </div>
  );
};

const UpgradePrompt = () => {
  const navigate = useNavigate();

  const handleNavigateToPlans = () => {
    navigate('/planos');
  };

  return (
    <div className="p-4 bg-yellow-200 text-center rounded">
      <p>Este conteúdo é exclusivo para assinantes. Faça upgrade para acessar tudo.</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={handleNavigateToPlans}>
        Assinar agora
      </button>
    </div>
  );
};

const PostContent = ({ post, accessLevel }: { post: IPostData; accessLevel: string }) => {
  if (accessLevel === 'login') {
    return (
      <div>
        <p
          className="text-justify text-lg font-montserrat font-light prose tiptap mb-2"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />
        <LoginPrompt />
      </div>
    );
  }

  if (accessLevel === 'upgrade') {
    return (
      <div>
        <p
          className="text-justify text-lg font-montserrat font-light prose tiptap line-clamp-[16] mb-2"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />
        <UpgradePrompt />
      </div>
    );
  }

  return (
    <p
      className="text-justify text-lg font-montserrat font-light prose tiptap"
      dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
    />
  );
};

export const PostDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<IPostData>();

  const { user } = useUser();

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
  const accessLevel = checkPostAccess(user, post?.visibility ?? 'pro');

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      {post && <PostInfo post={post} />}
      <div className="container mx-auto max-w-[800px] my-5 px-4">
        {post ? <PostContent post={post} accessLevel={accessLevel} /> : <p>Carregando...</p>}
      </div>
      <Footer showPlans showContact={false} />
    </div>
  );
};
