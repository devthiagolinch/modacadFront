import { IPostDataRequest } from '../../../../shared/api/posts/PostsService';
import { useForm } from 'react-hook-form';
import GoogleSnnipet from './snnipets/GoogleSnnipetsPreview';

interface CardDTO {
  post: IPostDataRequest;
  setPost: React.Dispatch<React.SetStateAction<IPostDataRequest>>;
}

interface FormData {
  meta_description: string;
}

export const CardMetaGoogle: React.FC<CardDTO> = ({ post, setPost }) => {
  const { register } = useForm<FormData>();

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
          <span className="font-montserrat font-medium text-zinc-400">({post.meta_title?.length || 0}/60)</span>{' '}
        </label>
        <input
          type="text"
          name="meta_title"
          value={post?.meta_title}
          onChange={handleInputChange}
          maxLength={60}
          className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
        />
      </div>
      {/* Descrição */}
      <div className="mb-6">
        <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
          Meta descrição
          <span className="font-montserrat font-medium text-zinc-400">({post.meta_description?.length || 0}/145)</span>
        </label>
        <textarea
          {...register('meta_description')}
          id="meta_description"
          name="meta_description"
          value={post.meta_description}
          onChange={handleInputChange}
          placeholder="Resumo de 145 caracteres"
          maxLength={145}
          className="border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none min-h-[190px]" // Define um número de linhas padrão
        />
      </div>
      <GoogleSnnipet
        title={post.meta_title}
        url={post.canonicalUrl}
        description={post.meta_description}
        publish_date={post.published_at}
      />
    </div>
  );
};
