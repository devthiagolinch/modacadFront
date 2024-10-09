import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import {
  TPostsStatus,
  statuses,
  TPostsType,
  types,
  visibilities,
  TPostsVisibility,
} from '../../shared/services/postOptions';
import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';
import { IPostDataRequest, PostsService } from '../../shared/api/posts/PostsService';
import { LayoutDashboard } from '../../shared/layouts';
import { ITagData, TagsService } from '../../shared/api/tags/TagsService';
import { IUserData, UsersService } from '../../shared/api/users/UserServices';

const defaultPost: IPostDataRequest = {
  title: '',
  description: '',
  feature_image: null,
  type: 'texto',
  content: '',
  status: 'draft',
  images: null,
  visibility: 'pro',
  admins: [],
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
};

export const PostEditor = () => {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<IPostDataRequest>(defaultPost);

  const [subjectsOptions, setSubjectsOptions] = useState<ISubjectData[]>([]);
  const [tagsOptions, setTagsOptions] = useState<ITagData[]>([]);
  const [usersOptions, setUsersOptions] = useState<IUserData[]>([]);

  const [featureImageUrl, setFeatureImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: true })],
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

    TagsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
      } else {
        setTagsOptions(response);
        setFilteredTags(response);
      }
    });

    UsersService.getAllStaff().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setUsersOptions(response);
    });
  }, []);

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

  // Tags
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<ITagData[]>(tagsOptions);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredTags(
      tagsOptions.filter((tag) => tag.name.toLowerCase().includes(value) || tag.slug.toLowerCase().includes(value))
    );
  };

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

  const handleChangeStatus = (status: TPostsStatus) => {
    setPost({ ...post, status });
  };

  const handleChangeVisibility = (visibility: TPostsVisibility) => {
    setPost({ ...post, visibility });
  };

  const handleChangeType = (type: TPostsType) => {
    setPost({ ...post, type });
  };

  const handleChangeTags = (newTag: ITagData) => {
    setPost((prevPost) => {
      let updatedTags: ITagData[] = [];
      updatedTags = [...prevPost.tags];

      const isSelected = updatedTags.includes(newTag);
      isSelected ? (updatedTags = updatedTags.filter((tag) => tag !== newTag)) : updatedTags.push(newTag);

      return { ...prevPost, tags: updatedTags };
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSubjectSelect = (newSubject: ISubjectData) => {
    setPost((prevPost) => {
      let updatedSubjects: ISubjectData[] = [];
      updatedSubjects = [...prevPost.subjects];

      const isSelected = updatedSubjects.some((s) => s.id === newSubject.id);
      if (isSelected) {
        updatedSubjects = updatedSubjects.filter((subject) => subject.id !== newSubject.id);
      } else {
        if (post.subjects.length < 3) {
          updatedSubjects.push(newSubject);
        }
      }

      return { ...prevPost, subjects: updatedSubjects };
    });
  };

  const handleUserSelect = (newUser: IUserData) => {
    setPost((prevPost) => {
      let updatedAdmins: IUserData[] = [];
      updatedAdmins = [...prevPost.admins];

      const isSelected = updatedAdmins.some((admin) => admin.id === newUser.id);
      if (isSelected) {
        updatedAdmins = updatedAdmins.filter((admin) => admin.id !== newUser.id);
      } else {
        updatedAdmins.push(newUser);
      }

      return { ...prevPost, admins: updatedAdmins };
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
        <div className="mb-4 relative w-64">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            onClick={toggleDropdown}
            placeholder="Pesquise tags"
          />
          {isOpen && (
            <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleChangeTags(tag)}
                  >
                    {tag.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">Nenhum resultado encontrado</li>
              )}
            </ul>
          )}
          {post.tags.length > 0 && (
            <div className="mt-2">
              {post.tags.map((tag, index) => (
                <span
                  onClick={() => handleChangeTags(tag)}
                  key={index}
                  className="inline-block bg-blue-500 text-white rounded-full px-4 py-2 mr-2"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Autores */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Autores</label>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {usersOptions.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleUserSelect(user)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${post.admins.some((admin) => admin.id === user.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assuntos</label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {subjectsOptions.map((subject) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => handleSubjectSelect(subject)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  Array.isArray(post.subjects) && post.subjects.some((s) => s.id === subject.id)
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
                      onClick={() => handleChangeStatus(status as TPostsStatus)}
                    >
                      {statuses[status as TPostsStatus].name}
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
                      onClick={() => handleChangeVisibility(visibility as TPostsVisibility)}
                    >
                      {visibilities[visibility as TPostsVisibility].name}
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
                      onClick={() => handleChangeType(type as TPostsType)}
                    >
                      {types[type as TPostsType]}
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
