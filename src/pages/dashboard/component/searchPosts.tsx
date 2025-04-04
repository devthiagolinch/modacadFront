// components/SearchInput.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { SearchResults } from './SearchResults';
import { IPostData } from '../../../shared/api/posts/PostsService';
import { FaSearch } from 'react-icons/fa';

export const SearchPosts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<IPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    setIsLoading(true);
    
    try {
      const response = await axios.get(`/api/posts/search?title=${encodeURIComponent(searchTerm)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaSearch />
      </button>
      
      <div className="absolute z-50 w-full mt-1 top-full">
        <SearchResults 
          results={results} 
          isVisible={isSearchActive} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};