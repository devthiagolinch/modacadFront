import { FC, useState } from 'react';
import { PostsService } from '../../../shared/api/posts/PostsService';
import { Link } from 'react-router-dom';

interface ISearchDialogProps {
  isOpen: boolean;
  toggleDialog: () => void;
}

interface ISearchResult {
  id: number;
  title: string;
  type: string;
}

export const SearchDialog: FC<ISearchDialogProps> = ({ isOpen, toggleDialog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setResults([])
    setLoading(true);results
    
    const response = await PostsService.searchPost({
      term: searchTerm,

      // nao consegui lidar com paginacao aqui @jeuchaves, acabei deixando com limite alto, se puder de dar um help. TNKS
      limit: 50,
      page: 1,
    });

    if (response instanceof Error) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    setResults((prevPosts) => [...(prevPosts || []), ...response.posts]); // Concatena os novos posts

    setLoading(false);
  };


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
                handleSearch(); // Executa a pesquisa quando "Enter" for pressionado
              }
            }}          
            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          className="w-full text-gray-950 border border-gray-950 p-2 highlight-link"
          onClick={handleSearch}
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
                    <Link key={item.id} className="py-2 highlight-link" to={item.type === 'texto' ? `/posts/${item.id}` : `/pilulas/${item.id}`}
                      onClick={toggleDialog}
                    >
                      <p className="font-medium">{item.title}</p>
                    </Link>
                  ))}
                </ul>
              </div>
              
              {/* <div className="mt-3 justify-center items-center flex">
                <button
                  className="min-h-auto w-3/5 p-2 px-[25px]
                          border-[1px] border-[#202020]
                          font-montserrat_medium text-base
                          flex flex-col justify-center items-center
                          bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_.90em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_75%]"
                  onClick={handleLoadMore}
                >
                  {' '}
                  MAIS
                </button>
              </div> */}
          </div>
          ) : (
            !loading && <p className="text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
