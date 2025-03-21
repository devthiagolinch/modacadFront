import { IPostDataRequest } from 'src/shared/api/posts/PostsService';
import { FacebookPreview } from './snnipets/FaceSnnipetPreviewl';

interface ICardMetaOGProps {
  post: IPostDataRequest;
  setPost: React.Dispatch<React.SetStateAction<IPostDataRequest>>;
}

export const CardMetaOG: React.FC<ICardMetaOGProps> = ({ post, setPost }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/** URL */}
      <div className="mb-6">
        <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
          {' '}
          Meta Title{' '}
          <span className="font-montserrat font-medium text-zinc-400">({post.og_title?.length || 0}/60)</span>{' '}
        </label>
        <input
          type="text"
          name="og_title"
          value={post?.og_title}
          onChange={handleInputChange}
          className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
          maxLength={60}
        />
      </div>
      {/* Descrição */}
      <div className="mb-6">
        <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
          Meta descrição
          <span className="font-montserrat font-medium text-zinc-400">({post.og_description?.length || 0}/120)</span>
        </label>
        <textarea
          name="og_description"
          value={post.og_description || ''}
          onChange={handleInputChange}
          placeholder="Resumo de 120 caracteres"
          maxLength={120}
          className="border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none min-h-[190px]" // Define um número de linhas padrão
        />
      </div>
      <FacebookPreview
        imageUrl={post.feature_image}
        url={post.canonicalUrl}
        title={post.og_title}
        description={post.og_description}
      />
    </div>
  );
};
