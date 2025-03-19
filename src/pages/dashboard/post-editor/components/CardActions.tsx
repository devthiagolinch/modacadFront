import { FaEye, FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { IPostDataRequest, PostsService } from '../../../../shared/api/posts/PostsService';
import { useNavigate } from 'react-router-dom';

interface ICardActionProps {
  post: IPostDataRequest;
  postId?: string;
}

export const CardActions: React.FC<ICardActionProps> = ({ post, postId }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    if (postId && postId !== 'novo') {
      PostsService.updateById(postId, post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    } else {
      post.status = 'draft';
      PostsService.create(post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    }
  };

  const handleSubmit = () => {
    const adjustedPost = { ...post };

    if (adjustedPost.canonicalUrl?.startsWith('https://blog.modacad.com.br/')) {
      // Remover o prefixo para enviar apenas o slug
      adjustedPost.canonicalUrl = adjustedPost.canonicalUrl.replace('https://blog.modacad.com.br/', '');
    }

    if (postId && postId !== 'novo') {
      if (post.status === 'published') {
        post.status = 'draft';
      } else {
        post.status = 'published';
      }
      PostsService.updateById(postId, post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    } else {
      post.status = 'published';
      PostsService.create(post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    }
  };

  const handleDelete = async () => {
    if (!postId) {
      console.error('postId não encontrado');
      return;
    }
    await PostsService.deletePost(postId);
    navigate('/dashboard/pilula');
  };

  return (
    <div>
      {/* Botão de Publicar */}
      <div className="mb-6 flex gap-4 justify-center">
        <button className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto" onClick={handleSave}>
          <FaRegSave size={32} />
        </button>
        <button
          className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto"
          onClick={() => window.open(`/posts/${postId}`, '_blank')}
        >
          <FaEye size={32} />
        </button>
        <button
          className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hi w-full highlight-link"
          onClick={handleSubmit}
        >
          {post.status === 'published' ? 'Despublicar' : 'Publicar'}
        </button>
      </div>

      <div>
        <button
          className="border border-red-900 w-full h-12 text-red-800 flex justify-center items-center gap-2"
          onClick={handleDelete}
        >
          <FaRegTrashAlt size={22} />
          EXCLUIR POST
        </button>
      </div>
    </div>
  );
};
