import React, { useState } from 'react';

interface IPlans {
  title: string;
  price: number;
  description: string;
  advantages: string[];
}

interface ICreatePlanProps {
  selectedPlan: IPlans | null;
}

export const CreatePlan: React.FC<ICreatePlanProps> = ({ selectedPlan }) => {
  const [advantages, setAdvantages] = useState([{ id: Date.now(), value: '' }]);

  const handleAddAdvantage = () => {
    setAdvantages([...advantages, { id: Date.now(), value: '' }]);
  };

  const handleRemoveAdvantage = (id: number) => {
    setAdvantages(advantages.filter((offer) => offer.id !== id));
  };

  const handleAdvantageChange = (id: number, value: string) => {
    setAdvantages(advantages.map((offer) => (offer.id === id ? { ...offer, value } : offer)));
  };

  return (
    <div>
      <div>
        <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
          {selectedPlan ? 'ATUALIZAR' : 'SALVAR'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* Nome */}
          <div className="mt-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* Preço */}
          <div className="mt-2">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
              Preço
            </label>
            <input
              type="text"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* Descrição */}
          <div className="mt-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* Ordem na tela (TO DO: Implementar) */}
        </div>
        <div>
          {/* Ofertas de valor */}
          <div className="mt-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Ofertas de valor
            </label>
            {advantages.map((offer) => (
              <div key={offer.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={offer.value}
                  onChange={(e) => handleAdvantageChange(offer.id, e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <button type="button" onClick={() => handleRemoveAdvantage(offer.id)} className="ml-2 text-red-500">
                  Excluir
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddAdvantage} className="mt-2 text-blue-500">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
