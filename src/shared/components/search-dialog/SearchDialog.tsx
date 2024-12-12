import { FC, useState } from 'react';

interface ISearchDialogProps {
  isOpen: boolean;
  toggleDialog: () => void;
}

interface ISearchResult {
  id: number;
  title: string;
  description: string;
}

export const SearchDialog: FC<ISearchDialogProps> = ({ isOpen, toggleDialog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
    console.log(searchTerm);
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
        <div className="mt-4">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((item) => (
                <li key={item.id} className="py-2">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
