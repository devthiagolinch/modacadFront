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
    <div className="p-4 text-center font-montserrat font-light mt-8 text-lg">
      <p>Para continuar a ler, faça login.</p>
      <button
        className="border border-gray-950 px-8 py-4 mt-2 highlight-link font-medium"
        onClick={() => openDialog('login')}
      >
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
    <div className="p-4 text-center font-montserrat font-light mt-8 text-lg">
      <p>Texto exclusivo comunidadeModacad</p>
      <button
        className="border border-gray-950 px-8 py-4 mt-2 highlight-link font-medium"
        onClick={handleNavigateToPlans}
      >
        Conheça os Planos de leitura
      </button>
    </div>
  );
};

const PostContent = ({ post, accessLevel }: { post: IPostData; accessLevel: string }) => {
  if (accessLevel === 'login') {
    return (
      <div>
        <div className="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-16 before:bg-gradient-to-t before:from-[#f1ece8] before:to-transparent">
          <p
            className="text-justify text-lg font-montserrat font-light prose tiptap line-clamp-[16] mb-2"
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </div>
        <LoginPrompt />
        <UpgradePrompt />
      </div>
    );
  }

  if (accessLevel === 'upgrade') {
    return (
      <div>
        <div className="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-16 before:bg-gradient-to-t before:from-[#f1ece8] before:to-transparent">
          <p
            className="text-justify text-lg font-montserrat font-light prose tiptap line-clamp-[16] mb-2"
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </div>
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
  console.log(accessLevel);

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
