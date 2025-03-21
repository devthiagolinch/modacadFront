import { Tooltip } from '../../../../shared/components/ui/tooltip/Tooltip';
import { FaEye, FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { IPostDataRequest, PostsService } from '../../../../shared/api/posts/PostsService';
import { ConfirmationModal, TActionTypePost } from '../../../../shared/components/confirmation-modal/ConfirmationModal';
import { useState } from 'react';

interface ICardActionProps {
  post: IPostDataRequest;
  postId?: string;
}

export const CardActions: React.FC<ICardActionProps> = ({ post, postId }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<TActionTypePost | null>(null);

  const handleAction = (type: TActionTypePost) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    switch (actionType) {
      case 'delete':
        handleDelete();
        break;
      case 'publish':
      case 'unpublish':
        handleSubmit();
        break;
      default:
        break;
    }
    setIsModalOpen(false);
  };

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
          return;
        }
        navigate(`/posts/${response}/editar`);
      });
    }
  };

  const handleSubmit = () => {
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
    <div className="p-4">
      <div className="mb-6 flex gap-4 justify-between flex-wrap">
        <Tooltip label="Salvar">
          <button className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto" onClick={handleSave}>
            <FaRegSave size={32} />
          </button>
        </Tooltip>
        <Tooltip label="Visualizar">
          <a href={`/posts/${postId}`} target="_blank">
            <button className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto">
              <FaEye size={32} />
            </button>
          </a>
        </Tooltip>
        <Tooltip label="Excluir">
          <button
            className="px-4 py-2 text-zinc-500 hover:bg-red-800 hover:text-white w-auto"
            onClick={() => handleAction('delete')}
          >
            <FaRegTrashAlt size={32} />
          </button>
        </Tooltip>
      </div>
      <div>
        <button
          className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hi w-full highlight-link"
          onClick={() => handleAction(post.status === 'published' ? 'unpublish' : 'publish')}
        >
          {post.status === 'published' ? 'Despublicar' : 'Publicar'}
        </button>
      </div>
      <ConfirmationModal
        actionType={actionType}
        isOpen={isModalOpen}
        postTitle={post.title}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};
