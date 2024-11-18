


import { IPostDataRequest, PostsService } from "../../../../shared/api/posts/PostsService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CardDTO {
    isVisible: boolean; // Propriedade para controlar a visibilidade
    props: IPostDataRequest
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
  canonicalUrl: ''
};

export const CardMetaGoogle: React.FC<CardDTO> = ({ isVisible, props }) => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPostDataRequest>(defaultPost);
  const [isCardVisible, setIsCardVisible] = useState(isVisible);

  useEffect(() => {
    // Sincroniza a visibilidade com a prop inicial
    setIsCardVisible(isVisible);
  }, [isVisible]);

  const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev); // Alterna a visibilidade do CardBasicInfo
  };


  useEffect(() => {
    if (postId && postId !== 'novo') {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPost({
            title: response.title,
            description: response.description,
            feature_image: response.feature_image,
            type: response.type,
            content: response.content,
            status: response.status,
            images: response.images ? response.images.join(',') : null,
            visibility: response.visibility,
            admins: response.admins.map((admin) => admin),
            editors: response.editors.map((editor) => editor),
            curadors: response.curadors.map((curador) => curador),
            tags: response.tags.map((tag) => tag),
            subjects: response.subjects.map((subject) => subject),
            og_image: response.meta?.og_image ?? '',
            og_title: response.meta?.og_title ?? '',
            og_description: response.meta?.og_description ?? '',
            twitter_image: response.meta?.twitter_image ?? '',
            twitter_title: response.meta?.twitter_title ?? '',
            twitter_description: response.meta?.twitter_description ?? '',
            meta_title: response.meta?.meta_title ?? '',
            meta_description: response.meta?.meta_description ?? '',
            email_subject: response.meta?.email_subject ?? '',
            frontmatter: response.meta?.frontmatter ?? '',
            feature_image_alt: response.meta?.feature_image_alt ?? '',
            email_only: response.meta?.email_only ?? '',
            feature_image_caption: response.meta?.feature_image_caption ?? '',
            canonicalUrl: response.canonicalUrl,
            published_at: response.published_at
          });
        }
      });
    }else {
      setPost(props)
    }
  }, [ postId, props ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setPost((prev) => ({ ...prev, [name]: value }));
  };
  console.log(isVisible)
  return (
    <div className="col-span-4" style={{ display: isCardVisible ? 'block' : 'none' }} >
    {/* Informações da Postagem */}
    <div className="bg-white shadow-md p-6">
      <h1 className="text-2xl font-montserrat font-light mb-6">Meta Dados Google</h1>

    {/** Campo para URL da publicação */}
    <div className='mb-6'>
        <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2"> Meta Title </label>
        <input 
        type="text"
        name='meta_title'
        value={post?.meta_title}
        onChange={handleInputChange}
        className=' border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none'
        />
      </div>
      
      {/* Campo para descrição */}
      <div className="mb-6">
        <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">Meta descrição</label>
        <textarea
          name="meta_description"
          value={post.meta_description || ''}
          onChange={handleInputChange}
          placeholder="Resumo de 300 caracteres"
          maxLength={300}
          className="border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none min-h-[190px]" // Define um número de linhas padrão
        />
      </div>

      <button className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hover:bg-gradient-to-t 
                      from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:50%_75%] w-full" onClick={toggleCardVisibility}>
                Prontinho
      </button>
      </div>
    </div>
  )
}