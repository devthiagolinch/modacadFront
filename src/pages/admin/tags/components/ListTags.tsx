import React, { useEffect, useState } from 'react';
import { ITagData } from '../../../../shared/api/tags/TagsService';
import { FaSearch } from 'react-icons/fa';

interface IListTagsProps {
  tags: ITagData[];
  onSelectTag: (tag: ITagData) => void;
}
export const ListTags: React.FC<IListTagsProps> = ({ tags, onSelectTag }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<ITagData[]>(tags);

  // Filtrar tags
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filteredData = tags.filter((tag) => tag.name.toLowerCase().includes(lowercasedTerm));
    setFilteredTags(filteredData);
  }, [searchTerm, tags]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Input de busca */}
      <div>
        <label htmlFor="search_tags" className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Buscar tags
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="size-4" />
          </div>
          <input
            type="search"
            id="search_tags"
            className="block w-full p-4 ps-10 text-bgBtn border border-gray-300 rounded-full bg-gray-50 focus:ring-bgBtn focus:border-bgBtn"
            placeholder="Buscar tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Listagem de tags */}
      <div className="flex-grow md:h-4 bg-white mt-4 border border-gray-300 rounded-lg font-montserrat font-medium italic overflow-y-auto overflow-x-hidden">
        <ul>
          {filteredTags.map((tag) => (
            <li key={tag.id} className="border-b border-gray-300 p-4 last:border-0" onClick={() => onSelectTag(tag)}>
              <span className="highlight-link">{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
