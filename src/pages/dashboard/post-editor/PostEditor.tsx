import { useCallback, useEffect, useState } from 'react';

import '../../../assets/css/tiptap.css';

import { useParams } from 'react-router-dom';

import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';

import { FaImage } from 'react-icons/fa6';
import { TbBlockquote } from 'react-icons/tb';
import { FiDownload } from 'react-icons/fi';

import { IPostDataRequest, PostsService } from '../../../shared/api/posts/PostsService';
import { LayoutDashboard } from '../../../shared/layouts';
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';
import Placeholder from '@tiptap/extension-placeholder';
import { CardBasicInfo } from './components/CardBasicInfo';

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

export const PostEditor = () => {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState(defaultPost);

  const [featureImageUrl, setFeatureImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [openCard, setOpenCard] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      TextStyle.extend({
        addAttributes() {
          return {
            fontSize: {
              default: '16px',
              parseHTML: (element) => element.style.fontSize || '16px',
              renderHTML: (attributes) => {
                return attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {};
              },
            },
          };
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Insira o título aqui...'; // Placeholder para título
          }
          return 'Escreva o conteúdo do post aqui...'; // Placeholder para o conteúdo principal
        },
        emptyEditorClass: 'is-editor-empty', // Classe CSS para o editor vazio
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose-2xl focus:outline-none w-full min-h-screen-2 font-monteserrat text-[12px]',
      },
    },
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

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
            published_at: response.published_at,
            canonicalUrl: response.canonicalUrl,
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
          });
          editor?.commands.setContent(response.content);
          setFeatureImageUrl(response.feature_image);
        }
      });
    }
  }, [postId, editor]);

  const setLink = useCallback(() => {
    if (!editor?.getAttributes('link').href) {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    // Adiciona "https://" se necessário
    const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url.trim()}`;

    // Atualiza o link no editor
    editor?.chain().focus().extendMarkRange('link').toggleLink({ href: formattedUrl }).run();
  }, [editor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await PostsService.uploadImage(file);

    console.log(result);

    if (result instanceof Error) {
      console.error(result.message);
    } else {
      setPost((prev) => ({ ...prev, feature_image: result }));
      setFeatureImageUrl(result);
    }

    setUploading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await PostsService.uploadImage(file);

    if (result instanceof Error) {
      console.error(result.message);
    } else {
      const imageUrl = result;

      editor?.commands.setImage({ src: imageUrl });
    }

    setUploading(false);
  };

  return (
    <LayoutDashboard>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpenCard(!openCard)}
          className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className="container mx-auto py-6 sm:px-6 grid grid-cols-12 gap-6">
        <div className={`${openCard ? 'col-span-8' : 'col-span-12'}`}>
          {/* Imagem destacada */}
          <div className="mb-6 w-full bg-transparent justify-center align-middle">
            {
              /* Botão de Importar Imagem */
              featureImageUrl ? (
                <button
                  onClick={() => document.getElementById('featureImageInput')?.click()}
                  className="flex justify-center gap-8 align-middle py-2 px-4 w-full bg-transparent text-zinc-600 text-xl font-bold"
                >
                  <FiDownload className="text-zinc-600 text-2xl font-extrabold" /> Trocar Foto em Destaque
                </button>
              ) : (
                <button
                  onClick={() => document.getElementById('featureImageInput')?.click()}
                  className="flex justify-center gap-8 align-middle py-2 px-4 w-full bg-transparent text-zinc-600 text-xl font-bold"
                >
                  <FiDownload className="text-zinc-600 text-2xl font-extrabold" /> Foto em Destaque
                </button>
              )
            }

            {/* Input de arquivo oculto */}
            <input
              type="file"
              id="featureImageInput"
              accept="image/*"
              onChange={handleFeatureImageUpload}
              style={{ display: 'none' }}
            />
            {/* <input
                type="file"
                accept="image/*"
                onChange={handleFeatureImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              /> */}

            {uploading && <p className="text-sm font-montserrat text-gray-500 mt-2">Carregando...</p>}
            {featureImageUrl && (
              <img src={featureImageUrl} alt="Imagem destacada" className="mt-4 object-contain w-screen h-[400px]" />
            )}
          </div>
          {/* Campo para título */}
          <div className="mb-6">
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Título"
              className="border p-2 w-full font-montserrat font-medium focus-visible:border-[#dcdf1e] focus:outline-none text-4xl"
            />
          </div>

          {/* Campo para adicionar imagem ao conteúdo */}
          {/*<div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">Adicionar Imagem ao Conteúdo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">Carregando...</p>}
          </div> */}

          {editor && (
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex gap-2 p-2 bg-zinc-600 text-white font-montserrat font-medium text-md">
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive('heading', { level: 1 }) ? 'text-yellow-400' : 'hover:text-yellow-400'}
                >
                  H1
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? 'text-yellow-400' : 'hover:text-yellow-400'}
                >
                  H2
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'text-yellow-400' : 'hover:text-yellow-400'}
                >
                  Bullet list
                </button>
                {/* Botão de upload de imagem */}
                <button
                  onClick={() => document.getElementById('imageUpload')?.click()}
                  className="hover:text-yellow-400"
                >
                  <FaImage />
                </button>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </FloatingMenu>
          )}

          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex p-2 gap-2 bg-gray-950 drop-shadow-xl text-zinc-300 text-sm overflow-hidden leading-none">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'text-yellow-400 p-1' : 'p-1 items-center'}
                >
                  <FaBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'text-yellow-400 p-1' : ''}
                >
                  <FaItalic />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'text-yellow-400 p-1' : 'p-1'}
                >
                  <FaStrikethrough />
                </button>
                <button onClick={setLink}>link</button>
                <button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                  <TbBlockquote />
                </button>
              </div>
            </BubbleMenu>
          )}

          {/* Editor Tiptap para o conteúdo */}
          <div>
            <EditorContent
              editor={editor}
              className="w-full border-2 border-zinc-300 min-h-screen bg-white p-2 mx-auto focus:outline-none hover:border-[#dcdf1e] font-montserrat font-medium text-[12px]"
            />
          </div>
        </div>
        {openCard && (
          <div className="col-span-4 fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-auto">
            <CardBasicInfo props={post} />
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
};
