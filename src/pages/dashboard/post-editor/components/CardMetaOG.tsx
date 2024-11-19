import { useEffect, useState } from "react";
import { IPostDataRequest } from "src/shared/api/posts/PostsService";

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
    canonicalUrl: ''
  };

export const CardMetaOG: React.FC<CardDTO> = ({ isVisible, props, onChange }) => {
    const [post, setPost] = useState<IPostDataRequest>(defaultPost);
    const [isCardVisible, setIsCardVisible] = useState(isVisible);

    useEffect(() => {
        // Sincroniza a visibilidade com a prop inicial
        setIsCardVisible(isVisible);
    }, [isVisible]);

    const toggleCardVisibility = () => {
        setIsCardVisible((prev) => !prev); // Alterna a visibilidade do CardBasicInfo
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPost((prev) => ({ ...prev, [name]: value }));

        // Chama a callback com as mudanças
        onChange({ [name]: value });
    };

    return (
        <div className="col-span-4" style={{ display: isCardVisible ? 'block' : 'none' }} >
            {/* Informações da Postagem */}
            <div className="bg-white shadow-md p-6">
                <h1 className="text-2xl font-montserrat font-light mb-6">Meta Dados Face Instagram</h1>

                <div className="mb-6 w-full bg-transparent justify-center align-middle">
                    {props.feature_image && (
                        <img src={props.feature_image} alt="Imagem destacada" className="mt-4 object-cover w-screen h-64" />
                    )}
                </div>


                {/** Campo para URL da publicação */}
                <div className='mb-6'>
                    <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2"> Meta Title </label>
                    <input 
                    type="text"
                    name='og_title'
                    value={post?.og_title}
                    onChange={handleInputChange}
                    className=' border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none'
                    />
                </div>
                
                {/* Campo para descrição */}
                <div className="mb-6">
                    <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">Meta descrição</label>
                    <textarea
                    name="og_description"
                    value={post.og_description || ''}
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