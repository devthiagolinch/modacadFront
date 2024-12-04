import Datepicker from 'react-tailwindcss-datepicker';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { IPostDataRequest, PostsService } from '../../../../shared/api/posts/PostsService';
import { useEffect, useState } from 'react';
import { ITagData, TagsService } from '../../../../shared/api/tags/TagsService';
import { ISubjectData, SubjectsService } from '../../../../shared/api/subjects/SubjectsService';
import { TPostsType, TPostsVisibility, types, visibilities } from '../../../../shared/services/postOptions';
import { IUserData, UsersService } from '../../../../shared/api/users/UserServices';
import { FacebookPreview } from './snnipets/FaceSnnipetPreviewl';
import GoogleSnnipet from './snnipets/GoogleSnnipetsPreview';
import { useNavigate, useParams } from 'react-router-dom';

interface CardDTO {
  /*   title: string | '';
  feature_image: string | null;
  content: string | ''; */
  //isVisible: boolean; // Propriedade para controlar a visibilidade
  props: IPostDataRequest;
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

export const CardBasicInfo: React.FC<CardDTO> = ({ props }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPostDataRequest>(defaultPost);

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isCardFaceVisible, setIsCardFaceVisible] = useState(false);
  const [isCardBasicVisible, setCardBasicVisible] = useState(true);

  const [tagsOptions, setTagsOptions] = useState<ITagData[]>([]);
  const [subjectsOptions, setSubjectsOptions] = useState<ISubjectData[]>([]);

  const [usersOptions, setUsersOptions] = useState<IUserData[]>([]);

  const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev); // Alterna a visibilidade do CardBasicInfo
    setCardBasicVisible((prev) => !prev);
    window.scrollTo(0, 0);
  };

  const toggleCardFaceVisibility = () => {
    setIsCardFaceVisible((prev) => !prev); // Alterna a visibilidade do CardBasicInfo
    setCardBasicVisible((prev) => !prev);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (postId && postId !== 'novo') {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          const meta = Array.isArray(response.meta) && response.meta.length > 0 ? response.meta[0] : {};

          setPost({
            title: props.title,
            description: response.description,
            feature_image: props.feature_image,
            type: response.type,
            content: props.content,
            status: response.status,
            images: response.images ? response.images.join(',') : null,
            visibility: response.visibility,
            admins: response.admins.map((admin) => admin),
            editors: response.editors.map((editor) => editor),
            curadors: response.curadors.map((curador) => curador),
            tags: response.tags.map((tag) => tag),
            subjects: response.subjects.map((subject) => subject),
            og_image: meta?.og_image ?? '',
            og_title: meta?.og_title ?? '',
            og_description: meta?.og_description ?? '',
            twitter_image: meta.twitter_image ?? '',
            twitter_title: meta.twitter_title ?? '',
            twitter_description: meta.twitter_description ?? '',
            meta_title: meta.meta_title ?? '',
            meta_description: meta.meta_description ?? '',
            email_subject: meta.email_subject ?? '',
            frontmatter: meta.frontmatter ?? '',
            feature_image_alt: meta.feature_image_alt ?? '',
            email_only: meta.email_only ?? '',
            feature_image_caption: meta.feature_image_caption ?? '',
            canonicalUrl: response.canonicalUrl,
            published_at: response.published_at,
          });
        }
      });
    } else {
      setPost(props);
      post.og_image = props?.feature_image;
    }
  }, [postId, props]);

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

  // Canonical URL
  let canonicalUrl;
  if (post.canonicalUrl) {
    canonicalUrl = post.canonicalUrl.split('https://blog.modacad.com.br/', 2).pop();
  } else {
    canonicalUrl = '';
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
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

  const handleDateChange = (value: Date | null | { startDate: Date | null; endDate: Date | null }) => {
    let selectedDate;

    if (value && 'startDate' in value) {
      // Se for um intervalo de datas, usamos apenas a data de início
      selectedDate = value.startDate;
    } else {
      // Caso seja uma data única ou null
      selectedDate = value as Date | null;
    }
    console.log('selected date', selectedDate);

    setPost((prevPost) => ({
      ...prevPost,
      published_at: selectedDate,
    }));
  };

  const handleDeletePost = () => {
    postId ? PostsService.deletePost(postId) : console.log('nao existe post para ser deletado');
    navigate('/dashboard/pilula');
  };

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeVisibility = (visibility: TPostsVisibility) => {
    setPost({ ...post, visibility });
  };

  const handleChangeType = (type: TPostsType) => {
    setPost({ ...post, type });
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

  const handleEditorSelect = (newUser: IUserData) => {
    setPost((prevPost) => {
      let updatedEditors: IUserData[] = [];
      updatedEditors = [...prevPost.editors];

      const isSelected = updatedEditors.some((admin) => admin.id === newUser.id);
      if (isSelected) {
        updatedEditors = updatedEditors.filter((admin) => admin.id !== newUser.id);
      } else {
        updatedEditors.push(newUser);
      }

      return { ...prevPost, editors: updatedEditors };
    });
  };

  const handleCuradorSelect = (newUser: IUserData) => {
    setPost((prevPost) => {
      let updatedCuradors: IUserData[] = [];
      updatedCuradors = [...prevPost.curadors];

      const isSelected = updatedCuradors.some((admin) => admin.id === newUser.id);
      if (isSelected) {
        updatedCuradors = updatedCuradors.filter((admin) => admin.id !== newUser.id);
      } else {
        updatedCuradors.push(newUser);
      }

      return { ...prevPost, curadors: updatedCuradors };
    });
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
        }
      });
    }
    setNotification('Post salvo com sucesso!');
  };

  const handleSubmit = () => {
    if (postId && postId !== 'novo') {
      if (post.status === 'published') {
        post.status = 'draft';

        setNotification('Post despublicado com sucesso!');
      } else {
        post.status = 'published';
        setNotification('Post publicado com sucesso!');
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

  return (
    <div className="col-span-4">
      <div style={{ display: isCardBasicVisible ? 'block' : 'none' }}>
        {/* Informações da Postagem */}
        <div className="bg-white shadow-md p-6">
          <div className="flex gap-2 justify-between items-center mb-6">
            <h1 className="text-2xl font-montserrat font-light">{postId ? 'Edição' : 'Criação'}</h1>
          </div>

          {/** Campo para URL da publicação */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2"> URL da publicação</label>
            <input
              type="text"
              name="canonicalUrl"
              value={canonicalUrl}
              onChange={handleUrlChange}
              className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
            />
            <span className="text-sm text-zinc-500 font-light font-montserrat">blog.modacad.com.br/{canonicalUrl}</span>
          </div>

          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="publish-date" className="text-sm font-medium text-gray-700">
              Data de Publicação
            </label>
            <Datepicker
              asSingle={true}
              primaryColor={'yellow'}
              displayFormat="DD/MM/YYYY"
              value={post.published_at ? { startDate: post.published_at, endDate: post.published_at } : null} // Envia como intervalo de datas
              onChange={handleDateChange}
              inputClassName="p-2 w-full border-[1px] border-gray-200 focus:outline-none focus:border-[#dcdf1e]"
            />
          </div>

          {/* Campo para descrição */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">Descrição</label>
            <textarea
              name="description"
              value={post.description || ''}
              onChange={handleInputChange}
              placeholder="Resumo de 300 caracteres"
              maxLength={300}
              className="border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none min-h-[190px]" // Define um número de linhas padrão
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Tags</label>
            {post.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {post.tags.map((tag, index) => (
                  <span
                    onClick={() => handleChangeTags(tag)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-light font-montserrat px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
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
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-light font-montserrat bg-white">
                {post.tags.length > 0
                  ? post.tags.length > 1
                    ? `${post.tags[0].name} + ${post.tags.length - 1}`
                    : post.tags[0].name
                  : 'Selecione as tags'}
              </MenuButton>
              <MenuItems
                className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}
              >
                <div className="py-1">
                  <div className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

          {/* Assuntos */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Assuntos</label>
            {post.subjects.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {post.subjects.map((subject, index) => (
                  <span
                    onClick={() => handleSubjectSelect(subject)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-montserrat font-light px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
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
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-montserrat font-light bg-white">
                {post.subjects.length > 0
                  ? post.subjects.length > 1
                    ? `${post.subjects[0].name} + ${post.subjects.length - 1}`
                    : post.subjects[0].name
                  : 'Selecione os assuntos'}
              </MenuButton>
              <MenuItems
                className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

          {/* Visibilidade */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Visibilidade</label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-montserrat font-light bg-white">
                {visibilities[post.visibility].name}
              </MenuButton>
              <MenuItems className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  {Object.keys(visibilities).map((visibility) => (
                    <MenuItem key={visibility}>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm font-montserrat font-light w-full text-left`}
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
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Tipo</label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-montserrat font-light bg-white">
                {types[post.type]}
              </MenuButton>
              <MenuItems className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  {Object.keys(types).map((type) => (
                    <MenuItem key={type}>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm font-montserrat font-light w-full text-left`}
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

          {/* Autor */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Autor(a)</label>
            {post.admins.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {post.admins.map((admin, index) => (
                  <span
                    onClick={() => handleUserSelect(admin)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-montserrat font-light px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
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
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-light font-montserrat bg-white">
                {post.admins.length > 0
                  ? post.admins.length > 1
                    ? `${post.admins[0].name} + ${post.admins.length - 1}`
                    : post.admins[0].name
                  : 'Selecione os autores'}
              </MenuButton>
              <MenuItems
                className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
                            <img src={user.avatar ?? ''} alt={user.name} className="w-6 h-6 mr-2 rounded-full" />
                            {user.name}
                            {post.admins.some((admin) => admin.id === user.id) && (
                              <svg
                                className="w-4 h-4 ml-2 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

          {/* Editor(a) */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Edtor(a)</label>
            {post.admins.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {post.editors.map((admin, index) => (
                  <span
                    onClick={() => handleEditorSelect(admin)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-montserrat font-light px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
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
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-light font-montserrat bg-white">
                {post.editors.length > 0
                  ? post.editors.length > 1
                    ? `${post.editors[0].name} + ${post.editors.length - 1}`
                    : post.editors[0].name
                  : 'Selecione os autores'}
              </MenuButton>
              <MenuItems
                className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
                            onClick={() => handleEditorSelect(user)}
                          >
                            <img src={user.avatar ?? ''} alt={user.name} className="w-6 h-6 mr-2 rounded-full" />
                            {user.name}
                            {post.editors.some((admin) => admin.id === user.id) && (
                              <svg
                                className="w-4 h-4 ml-2 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

          {/* Curdador(a) */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Curador(a)</label>
            {post.curadors.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {post.curadors.map((admin, index) => (
                  <span
                    onClick={() => handleCuradorSelect(admin)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-montserrat font-light px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
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
              <MenuButton className="inline-flex justify-between w-full border shadow-sm px-4 py-2 text-sm font-light font-montserrat bg-white">
                {post.curadors.length > 0
                  ? post.curadors.length > 1
                    ? `${post.curadors[0].name} + ${post.curadors.length - 1}`
                    : post.curadors[0].name
                  : 'Selecione os autores'}
              </MenuButton>
              <MenuItems
                className="absolute mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
                            onClick={() => handleCuradorSelect(user)}
                          >
                            <img src={user.avatar ?? ''} alt={user.name} className="w-6 h-6 mr-2 rounded-full" />
                            {user.name}
                            {post.curadors.some((admin) => admin.id === user.id) && (
                              <svg
                                className="w-4 h-4 ml-2 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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

          <div>
            <button className="w-full border border-zinc-400 mb-5 h-10 highlight-link" onClick={toggleCardVisibility}>
              MetaDados Google
            </button>

            <button
              className="w-full border border-zinc-400 mb-5 h-10 highlight-link"
              onClick={toggleCardFaceVisibility}
            >
              MetaDados OG
            </button>
          </div>

          {/* Botão de Publicar */}
          <div className="mb-6 flex gap-4 justify-center">
            <button className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto" onClick={handleSave}>
              <FaRegSave size={32} />
            </button>
            <button
              className="px-4 py-2 text-zinc-500 hover:bg-[#dcdf1e] w-auto"
              onClick={() => window.open(`/posts/${postId}`, '_blank')}
            >
              <FaEye size={32} />
            </button>
            <button
              className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hi w-full highlight-link"
              onClick={handleSubmit}
            >
              {post.status === 'published' ? 'Despublicar' : 'Publicar'}
            </button>
          </div>

          <div>
            <button
              className="border border-red-900 w-full h-12 text-red-800 flex justify-center items-center gap-2"
              onClick={handleDeletePost}
            >
              <FaRegTrashAlt size={22} />
              EXCLUIR POST
            </button>
          </div>
        </div>
      </div>

      {/** CARD META DADOS GOOGLE */}
      <div className="col-span-4" style={{ display: isCardVisible ? 'block' : 'none' }}>
        {/* Informações da Postagem */}
        <div className="bg-white shadow-md">
          <h1 className="text-2xl font-montserrat font-light mb-6">Meta Dados Google</h1>

          {/** Campo para URL da publicação */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2"> Meta Title </label>
            <input
              type="text"
              name="meta_title"
              value={post?.meta_title}
              onChange={handleInputChange}
              className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
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

          <GoogleSnnipet
            title={post.meta_title}
            url={canonicalUrl}
            description={post.meta_description}
            publish_date={post.published_at}
          />

          <button
            className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hover:bg-gradient-to-t 
                          from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:50%_75%] w-full"
            onClick={toggleCardVisibility}
          >
            Prontinho
          </button>
        </div>
      </div>

      {/** CARD META DADOS OG */}
      <div className="col-span-4" style={{ display: isCardFaceVisible ? 'block' : 'none' }}>
        {/* Informações da Postagem */}
        <div className="bg-white shadow-md">
          <h1 className="text-2xl font-montserrat font-light mb-6">Meta Dados Face Instagram</h1>

          {/** Campo para URL da publicação */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2"> Meta Title </label>
            <input
              type="text"
              name="og_title"
              value={post?.og_title}
              onChange={handleInputChange}
              className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
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

          <FacebookPreview
            imageUrl={post.feature_image}
            url={canonicalUrl}
            title={post.og_title}
            description={post.og_description}
          />

          <button
            className="px-4 py-2 border-[1px] font-montserrat font-light text-zinc-900 border-zinc-500 hover:bg-gradient-to-t 
                                from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:50%_75%] w-full"
            onClick={toggleCardFaceVisibility}
          >
            Prontinho
          </button>
        </div>
      </div>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};
