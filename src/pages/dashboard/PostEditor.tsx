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
        setFilteredTags(response.slice(0, 5));
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<ITagData[]>(tagsOptions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredTags(
      tagsOptions
        .filter((tag) => tag.name.toLowerCase().includes(value) || tag.slug.toLowerCase().includes(value))
        .slice(0, 5)
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
      <div className="container mx-auto py-6 sm:px-6 grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <h1 className="text-2xl font-bold mb-6">{postId ? 'Editar Publicação' : 'Criar Publicação'}</h1>

          {/* Campo para título */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Digite o título da postagem"
              className="border p-2 w-full rounded-md"
            />
          </div>

          {/* Campo para adicionar imagem ao conteúdo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar Imagem ao Conteúdo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">Carregando...</p>}
          </div>

          {/* Editor Tiptap para o conteúdo */}
          <div className="border p-4 rounded-lg mb-6">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="col-span-4">
          {/* Informações da Postagem */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Detalhes da postagem</h2>
            {/* Imagem destacada */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagem Destacada</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFeatureImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Carregando...</p>}
              {featureImageUrl && (
                <img src={featureImageUrl} alt="Imagem destacada" className="mt-4 max-h-64 object-cover rounded-lg" />
              )}
            </div>

            {/* Campo para descrição */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <input
                type="text"
                name="description"
                value={post.description}
                onChange={handleInputChange}
                placeholder="Digite a descrição da postagem"
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span
                      onClick={() => handleChangeTags(tag)}
                      key={index}
                      className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
                    >
                      {tag.name}
                      <svg
                        className="ml-2 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  ))}
                </div>
              )}
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {post.tags.length > 0
                    ? post.tags.length > 1
                      ? `${post.tags[0].name} + ${post.tags.length - 1}`
                      : post.tags[0].name
                    : 'Selecione as tags'}
                </MenuButton>
                <MenuItems
                  className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  <div className="py-1">
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Pesquise tags"
                      />
                    </div>
                    {filteredTags.length > 0 ? (
                      filteredTags.map((tag) => (
                        <MenuItem key={tag.id}>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left flex items-center`}
                              onClick={() => handleChangeTags(tag)}
                            >
                              {post.tags.some((selectedTag) => selectedTag.id === tag.id) && (
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              {tag.name}
                            </button>
                          )}
                        </MenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">Nenhum item encontrado</div>
                    )}
                  </div>
                </MenuItems>
              </Menu>
            </div>

            {/* Autores */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Autores</label>
              {post.admins.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {post.admins.map((admin, index) => (
                    <span
                      onClick={() => handleUserSelect(admin)}
                      key={index}
                      className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
                    >
                      {admin.name}
                      <svg
                        className="ml-2 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  ))}
                </div>
              )}
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {post.admins.length > 0
                    ? post.admins.length > 1
                      ? `${post.admins[0].name} + ${post.admins.length - 1}`
                      : post.admins[0].name
                    : 'Selecione os autores'}
                </MenuButton>
                <MenuItems
                  className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  <div className="py-1">
                    {usersOptions.length > 0 ? (
                      usersOptions.map((user) => (
                        <MenuItem key={user.id}>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left flex items-center`}
                              onClick={() => handleUserSelect(user)}
                            >
                              <img src={user.avatar ?? ''} alt={user.name} className="w-6 h-6 rounded-full mr-2" />
                              {user.name}
                              {post.admins.some((admin) => admin.id === user.id) && (
                                <svg
                                  className="w-4 h-4 ml-2 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </MenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">Nenhum autor encontrado</div>
                    )}
                  </div>
                </MenuItems>
              </Menu>
            </div>

            {/* Assuntos */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assuntos</label>
              {post.subjects.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {post.subjects.map((subject, index) => (
                    <span
                      onClick={() => handleSubjectSelect(subject)}
                      key={index}
                      className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
                    >
                      {subject.name}
                      <svg
                        className="ml-2 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  ))}
                </div>
              )}
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {post.subjects.length > 0
                    ? post.subjects.length > 1
                      ? `${post.subjects[0].name} + ${post.subjects.length - 1}`
                      : post.subjects[0].name
                    : 'Selecione os assuntos'}
                </MenuButton>
                <MenuItems
                  className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  <div className="py-1">
                    {subjectsOptions.length > 0 ? (
                      subjectsOptions.map((subject) => (
                        <MenuItem key={subject.id}>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left flex items-center`}
                              onClick={() => handleSubjectSelect(subject)}
                            >
                              {post.subjects.some((s) => s.id === subject.id) && (
                                <svg
                                  className="w-4 h-4 ml-2 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              {subject.name}
                            </button>
                          )}
                        </MenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">Nenhum assunto encontrado</div>
                    )}
                  </div>
                </MenuItems>
              </Menu>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {statuses[post.status].name}
                </MenuButton>
                <MenuItems className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
            </div>

            {/* Visibilidade */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Visibilidade</label>
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {visibilities[post.visibility].name}
                </MenuButton>
                <MenuItems className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
            </div>

            {/* Tipo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Menu as="div" className="relative inline-block text-left w-full">
                <MenuButton className="inline-flex justify-between w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-white">
                  {types[post.type]}
                </MenuButton>
                <MenuItems className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
            </div>

            {/* Botão de Publicar */}
            <div className="mb-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded w-full" onClick={handleSubmit}>
                {postId ? 'Atualizar Postagem' : 'Publicar Postagem'}
              </button>
              <button
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded w-full mt-2"
                onClick={() => window.open(`/posts/${postId}`, '_blank')}
              >
                Ver Publicação
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};
