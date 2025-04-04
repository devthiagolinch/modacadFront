import React, { useState, useEffect, useRef } from 'react';
import { SearchResults } from './SearchResults';
import { PostsService } from '../../../shared/api/posts/PostsService';

interface ISearchResult {
  id: number;
  title: string;
  type: string;
}

export const SearchPosts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const searchPosts = async (term: string) => {
    if (term.trim() === '') {
      setResults([]);
      setIsSearchActive(false);
      return;
    }

    setIsLoading(true);
    setIsSearchActive(true);
    
    try {
      const response = await PostsService.searchPostTitle({
        term: term,
        limit: 10,
        page: 1,
      });
      
      if (response instanceof Error) {
        console.error(response.message);
        setResults([]);
      } else {
        setResults(response.posts);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca em tempo real com debounce
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm.trim() !== '') {
      debounceTimeout.current = setTimeout(() => {
        searchPosts(searchTerm);
      }, 300);
    } else {
      setResults([]);
      setIsSearchActive(false);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  // Busca ao pressionar Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      searchPosts(searchTerm);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="search"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 h-auto focus:outline-none "
        />
      </div>
      
      {isSearchActive && (
        <div className="absolute z-50 w-full mt-1">
          <SearchResults 
            results={results} 
            isVisible={isSearchActive} 
            isLoading={isLoading} 
          />
        </div>
      )}
    </div>
  );
};