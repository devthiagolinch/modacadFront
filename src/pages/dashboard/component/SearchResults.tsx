// components/SearchResults.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ISearchResult {
    id: number;
    title: string;
    type: string;
}

interface SearchResultsProps {
  results: ISearchResult[];
  isVisible: boolean;
  isLoading: boolean;
}


export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isVisible, 
  isLoading 
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
      {isLoading ? (
        <div className="p-3 text-center text-gray-500">Buscando...</div>
      ) : results.length > 0 ? (
        <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
          {results.map((post) => (
            <li key={post.id} className="hover:bg-gray-50">
              <Link 
                to={`/posts/${post.id}/editar`}
                className="block p-3 text-gray-800 hover:bg-primary"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 text-center text-gray-500">Nenhum resultado encontrado</div>
      )}
    </div>
  );
};