import { useState } from 'react';
import { IPostDataRequest } from 'src/shared/api/posts/PostsService';
import { FacebookPreview } from './snnipets/FaceSnnipetPreviewl';

interface CardDTO {
  isVisible: boolean; // Propriedade para controlar a visibilidade
  props: IPostDataRequest;
  onChange: (updatedData: Partial<IPostDataRequest>) => void; // Callback para enviar os dados alterados
}

const defaultPost: IPostDataRequest = {
  title: '',
  description: '',
  feature_image: null,
  type: 'texto',
  content: '',
  status: 'draft',
  images: null,
  published_at: null,
  visibility: 'pro',
  admins: [],
  editors: [],
  curadors: [],
  tags: [],
  subjects: [],
  og_image: '',
  og_title: '',
  og_description: '',
  twitter_image: '',
  twitter_title: '',
  twitter_description: '',
  meta_title: '',
  meta_description: '',
  email_subject: '',
  frontmatter: '',
  feature_image_alt: '',
  feature_image_caption: '',
  email_only: '',
  canonicalUrl: '',
};

export const CardMetaOG: React.FC<CardDTO> = ({ onChange }) => {
  const [post, setPost] = useState<IPostDataRequest>(defaultPost);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));

    // Chama a callback com as mudanças
    onChange({ [name]: value });
  };

  return (
    <div className="col-span-4">
      {/* Informações da Postagem */}
      <div className="bg-white shadow-md">
        <h1 className="text-2xl font-montserrat font-light mb-6">Meta Dados Face Instagram</h1>

        {/** Campo para URL da publicação */}
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

        {/* Campo para descrição */}
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
    </div>
  );
};
