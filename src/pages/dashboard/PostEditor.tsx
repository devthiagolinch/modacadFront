import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { EditorContent, useEditor } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Image from '@tiptap/extension-image';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Status, statuses, PostType, types, visibilities, Visibility } from '../../shared/services/postOptions';
import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';
import { IPostSave, PostsService } from '../../shared/api/posts/PostsService';
import { LayoutDashboard } from '../../shared/layouts';

const defaultPost: IPostSave = {
  title: '',
  description: '',
  type: 'texto',
  content: '',
  tags: [],
  subjects: [],
  status: 'draft',
  visibility: 'pro',
};

export const PostEditor = () => {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<IPostSave>(defaultPost);
  const [subjectsOptions, setSubjectsOptions] = useState<ISubjectData[]>([]);
  const [featureImageUrl, setFeatureImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Heading, Bold, Image.configure({ inline: true })],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
      } else {
        setSubjectsOptions(response);
      }
    });

    if (postId && postId !== 'novo') {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPost(response);
          editor?.commands.setContent(response.content);
          setFeatureImageUrl(response.feature_image);
        }
      });
    }
  }, [postId, editor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await PostsService.uploadFeatureImage(postId || 'novo', file);

    console.log(result);

    if (result instanceof Error) {
      console.error(result.message);
    } else {
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

  const handleChangeStatus = (status: Status) => {
    setPost({ ...post, status });
  };

  const handleChangeVisibility = (visibility: Visibility) => {
    setPost({ ...post, visibility });
  };

  const handleChangeType = (type: PostType) => {
    setPost({ ...post, type });
  };

  const handleSubjectSelect = (subjectId: string) => {
    setPost((prevPost) => {
      let updatedSubjects: string[] = [];

      // Garantir que prevPost.subjects seja sempre tratado como um array de strings
      if (Array.isArray(prevPost.subjects)) {
        updatedSubjects = [...prevPost.subjects];
      } else if (typeof prevPost.subjects === 'string') {
        updatedSubjects = [prevPost.subjects];
      }

      // Verificar se o subject já foi selecionado
      const isSelected = updatedSubjects.includes(subjectId);

      if (isSelected) {
        // Remover o subject selecionado
        updatedSubjects = updatedSubjects.filter((id) => id !== subjectId);
      } else if (updatedSubjects.length < 3) {
        // Adicionar o subject se não estiver selecionado e não exceder o limite de 3
        updatedSubjects.push(subjectId);
      }

      // Retornar o estado atualizado
      return { ...prevPost, subjects: updatedSubjects };
    });
  };

  const handleSubmit = () => {
    if (postId && postId !== 'novo') {
      PostsService.updateById(postId, post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    } else {
      PostsService.create(post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        }
      });
    }
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto py-6 sm:px-6">
        <h1 className="text-xl font-bold mb-4">{postId ? 'Editar publicação' : 'Criar publicação'}</h1>

        {/* Imagem destacada */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Imagem destacada</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFeatureImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <p>Carregando...</p>}
          {featureImageUrl && (
            <img src={featureImageUrl} alt="Imagem destacada" className="mt-4 max-h-64 object-cover rounded-lg" />
          )}
        </div>

        {/* Campo para título */}
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Título"
          className="border p-2 w-full mb-4"
        />

        {/* Campo para descrição */}
        <input
          type="text"
          name="description"
          value={post.description}
          onChange={handleInputChange}
          placeholder="Descrição"
          className="border p-2 w-full mb-4"
        />

        {/* Campo para adicionar imagem ao conteúdo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Adicionar Imagem ao Conteúdo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <p>Carregando...</p>}
        </div>

        {/* Editor Tiptap para o conteúdo */}
        <div className="border p-2 rounded-lg mb-4">
          <EditorContent editor={editor} />
        </div>

        {/* Tags */}

        {/* Subjects */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assuntos</label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {subjectsOptions.map((subject) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => handleSubjectSelect(subject.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  Array.isArray(post.subjects) && post.subjects.includes(subject.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <Menu as="div" className="relative inline-block text-left mb-4">
          <MenuButton
            className={`inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium`}
          >
            {statuses[post.status].name}
          </MenuButton>
          <MenuItems className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.keys(statuses).map((status) => (
                <MenuItem key={status}>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left`}
                      onClick={() => handleChangeStatus(status as Status)}
                    >
                      {statuses[status as Status].name}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>

        {/* Visibilidade */}
        <Menu as="div" className="relative inline-block text-left mb-4">
          <MenuButton
            className={`inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium`}
          >
            {visibilities[post.visibility].name}
          </MenuButton>
          <MenuItems className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.keys(visibilities).map((visibility) => (
                <MenuItem key={visibility}>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left`}
                      onClick={() => handleChangeVisibility(visibility as Visibility)}
                    >
                      {visibilities[visibility as Visibility].name}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>

        {/* Tipo */}
        <Menu as="div" className="relative inline-block text-left mb-4">
          <MenuButton
            className={`inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium`}
          >
            {types[post.type]}
          </MenuButton>
          <MenuItems className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.keys(types).map((type) => (
                <MenuItem key={type}>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left`}
                      onClick={() => handleChangeType(type as PostType)}
                    >
                      {types[type as PostType]}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>

        {/* Botão de Publicar */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
          {postId ? 'Atualizar postagem' : 'Publicar Postagem'}
        </button>

        {/* Pré-visualização */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Pré-visualização:</h2>
          <div className="border p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </LayoutDashboard>
  );
};
