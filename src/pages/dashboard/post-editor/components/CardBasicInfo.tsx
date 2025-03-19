import { useEffect, useState } from 'react';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Datepicker from 'react-tailwindcss-datepicker';

import { TPostsType, TPostsVisibility, types, visibilities } from '../../../../shared/services/postOptions';
import { ISubjectData, SubjectsService } from '../../../../shared/api/subjects/SubjectsService';
import { IPostDataRequest } from '../../../../shared/api/posts/PostsService';
import { IUserData, UsersService } from '../../../../shared/api/users/UserServices';
import { ITagData, TagsService } from '../../../../shared/api/tags/TagsService';
import { Dialog } from '../../../../shared/components/ui/dialog/Dialog';
import { CardTagInfo } from './CardTagInfo';
import { toggleItemInArray } from '../../../../shared/utils/arrayUtils';

interface ICardBasicInfoProps {
  post: IPostDataRequest;
  setPost: React.Dispatch<React.SetStateAction<IPostDataRequest>>;
  postId?: string;
}

export const CardBasicInfo: React.FC<ICardBasicInfoProps> = ({ post, setPost, postId }) => {
  const [isEditTagDialogOpen, setIsEditTagDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<ITagData | null>(null);

  const [tagsOptions, setTagsOptions] = useState<ITagData[]>([]);
  const [subjectsOptions, setSubjectsOptions] = useState<ISubjectData[]>([]);
  const [usersOptions, setUsersOptions] = useState<IUserData[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<ITagData[]>(tagsOptions);

  const handleEditTag = (tag: ITagData) => {
    setSelectedTag(tag);
    setIsEditTagDialogOpen(true);
  };

  useEffect(() => {
    Promise.all([TagsService.getAll(), SubjectsService.getAll(), UsersService.getAllStaff()]).then(
      ([tags, subjects, users]) => {
        if (tags instanceof Error || subjects instanceof Error || users instanceof Error) {
          console.error('Error fetching data');
          return;
        }
        setTagsOptions(tags);
        setFilteredTags(tags.slice(0, 30));
        setSubjectsOptions(subjects);
        setUsersOptions(users.staffs);
      }
    );
  }, []);

  const getCanonicalUrl = () => {
    if (!post.canonicalUrl) return '';

    return post.canonicalUrl.startsWith('https://blog.modacad.com.br/')
      ? post.canonicalUrl.replace('https://blog.modacad.com.br/', '')
      : post.canonicalUrl;
  };

  const onCloseDialog = () => {
    setIsEditTagDialogOpen(false);
    setSelectedTag(null);
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

    setPost((prevPost: IPostDataRequest) => ({
      ...prevPost,
      published_at: selectedDate,
    }));
  };

  const handleChangeTags = (newTag: ITagData) => {
    setPost((prevPost) => ({
      ...prevPost,
      tags: toggleItemInArray(prevPost.tags, newTag),
    }));
    setSearchTerm('');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredTags(
      tagsOptions
        .filter((tag) => tag.name.toLowerCase().includes(value) || tag.slug.toLowerCase().includes(value))
        .slice(0, 30)
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
    setPost((prevPost) => ({
      ...prevPost,
      subjects: toggleItemInArray(prevPost.subjects, newSubject, 'id', 3), // Limite de 3 subjects
    }));
  };

  const handleUserSelect = (newUser: IUserData) => {
    setPost((prevPost) => ({
      ...prevPost,
      admins: toggleItemInArray(prevPost.admins, newUser, 'id'),
    }));
  };

  const handleEditorSelect = (newUser: IUserData) => {
    setPost((prevPost) => ({
      ...prevPost,
      editors: toggleItemInArray(prevPost.editors, newUser, 'id'),
    }));
  };

  const handleCuradorSelect = (newUser: IUserData) => {
    setPost((prevPost) => ({
      ...prevPost,
      curadors: toggleItemInArray(prevPost.curadors, newUser, 'id'),
    }));
  };

  return (
    <div className="col-span-4">
      <div>
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
              value={getCanonicalUrl()}
              onChange={handleInputChange}
              className=" border p-2 w-full font-montserrat font-light focus-visible:border-[#dcdf1e] focus:outline-none"
            />
            <span className="text-sm text-zinc-500 font-light font-montserrat">
              blog.modacad.com.br/{getCanonicalUrl()}
            </span>
          </div>

          <div className="flex flex-col items-start space-y-2 mb-6">
            <label htmlFor="publish-date" className="text-sm font-medium text-gray-700">
              Data de Publicação
            </label>
            <Datepicker
              asSingle={true}
              primaryColor={'yellow'}
              displayFormat="DD/MM/YYYY"
              value={post.published_at ? { startDate: post.published_at, endDate: post.published_at } : null} // Envia como intervalo de datas
              onChange={handleDateChange}
              inputClassName="p-2 w-full border-2 border-gray-200 focus:outline-none focus:border-[#dcdf1e]"
              popoverDirection="down"
            />
          </div>

          {/* Campo para descrição */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
              Descrição
              <span className="font-montserrat font-medium text-zinc-400">({post.description?.length || 0}/300)</span>
            </label>
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
                    onClick={() => {
                      setSelectedTag(tag);
                    }}
                    onDoubleClick={() => handleEditTag(tag)}
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-light font-montserrat px-3 py-1 mr-2 mb-2 cursor-pointer text-xs break-all flex items-center"
                  >
                    {tag.name}
                    <svg
                      onClick={() => handleChangeTags(tag)}
                      className="ml-2 min-w-4 h-4"
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
                Pesquisar Tags
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
                  {filteredTags.length > 0
                    ? filteredTags.map((tag) => (
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
                    : filteredTags.map((tag) => (
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
                      ))}
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
                    key={index}
                    className="inline-block bg-[#dcdf1e] text-black font-montserrat font-light px-3 py-1 mr-2 mb-2 cursor-pointer text-xs flex items-center"
                  >
                    {subject.name}
                    <svg
                      onClick={() => handleSubjectSelect(subject)}
                      className="ml-2 min-w-4 h-4"
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
                Selecionar Assuntos
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
                            onClick={() => handleUserSelect(user)}
                            className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm w-full text-left flex items-center`}
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
                                onClick={() => handleUserSelect(user)}
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
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Editor(a)</label>
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
                  : 'Selecione os editores'}
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

          {/* Curador(a) */}
          <div className="mb-6">
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
              Curador(a) de imagens
            </label>
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
                  : 'Selecione os curadores'}
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
        </div>
      </div>

      {/* Dialog para atualizar tag */}
      <Dialog isOpen={isEditTagDialogOpen} onClose={onCloseDialog}>
        <CardTagInfo onClose={onCloseDialog} onUpdated={onCloseDialog} selectedTag={selectedTag} />
      </Dialog>
    </div>
  );
};
