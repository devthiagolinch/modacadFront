import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { PostsService } from '../../../shared/api/posts/PostsService';
import { Link } from 'react-router-dom';

interface ISearchDialogProps {
  isDashboard: boolean
  isOpen: boolean;
  toggleDialog: () => void;
}

interface ISearchResult {
  id: number;
  title: string;
  type: string;
}

export const SearchDialog: FC<ISearchDialogProps> = ({ isDashboard, isOpen, toggleDialog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (page = 1) => {
    setLoading(true);
    setHasSearched(true); 
    
    const response = await PostsService.searchPost({
      term: searchTerm,
      limit: 50,
      page,
    });

    if (response instanceof Error) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    setResults((prevPosts) => (page === 1 ? response.posts : [...prevPosts, ...response.posts]));
    setLoading(false);
  };

  const loadMoreResults = useCallback(() => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreResults();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMoreResults]);


  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium font-butler">Buscar Publicações</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={toggleDialog}>
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Digite o termo de busca"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}      
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentPage(1);
                handleSearch(1); 
              }
            }}          
            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          className="w-full text-gray-950 border border-gray-950 p-2 highlight-link"
          onClick={() => {
            setCurrentPage(1);
            handleSearch(1);
          }}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {/* Resultados */}
        <div className="mt-4 overflow-x-hidden overflow-y-auto max-h-96 scrollbar-custom">
          {results.length > 0 ? (
            <div>
              <div className='flex-grow md:h-auto mt-4 font-montserrat font-medium overflow-y-auto overflow-x-hidden'>
                <ul className="divide-y divide-gray-200 flex flex-col">
                  {results.map((item) => (
                    isDashboard ?
                    <Link key={item.id} className="py-2 highlight-link" to={`/posts/${item.id}/editar`}>
                      <p className="font-medium">{item.title}</p>
                    </Link> :

                    <Link key={item.id} className="py-2 highlight-link" to={item.type === 'texto' ? `/posts/${item.id}` : `/pilulas/${item.id}`} 
                      onClick={toggleDialog}
                    >
                      <p className="font-medium">{item.title}</p>
                    </Link>
                  ))}
                </ul>
              </div>
              <div ref={observerRef} className="h-4"></div>
          </div>
          ) : (
            hasSearched && !loading && <p className="text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
