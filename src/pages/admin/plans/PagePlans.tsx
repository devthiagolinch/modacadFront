import { MdCheckCircleOutline } from 'react-icons/md';
import { LayoutDashboard } from '../../../shared/layouts';
import { CreatePlan } from './components/CreatePlan';
import { useState } from 'react';
import { IPlanData } from '../../../shared/api/plans/PlansService';

const plans: IPlanData[] = [
  {
    id: 1,
    title: 'Plano Trimestral',
    price: 8,
    description: 'Escolha flexível',
    advantages: [
      { id: 1, value: 'Todas as vantagens do plano básico' },
      { id: 2, value: 'Acesso exclusivo aos textos premium' },
      { id: 3, value: 'Chat exclusivo para membros' },
      { id: 4, value: 'Acesso livre de anúncios' },
    ],
  },
  {
    id: 2,
    title: 'Premium Anual',
    price: 5,
    description: 'Acesso descomplicado',
    advantages: [
      { id: 1, value: 'Todas as vantagens do plano básico' },
      { id: 2, value: 'Acesso exclusivo aos textos premium' },
      { id: 3, value: 'Chat exclusivo para membros' },
      { id: 4, value: 'Acesso livre de anúncios' },
    ],
  },
  {
    id: 3,
    title: 'Básico',
    price: 0,
    description: 'Garanta estas vantagens',
    advantages: [
      { id: 1, value: 'Todas as vantagens do plano básico' },
      { id: 2, value: 'Acesso exclusivo aos textos premium' },
      { id: 3, value: 'Chat exclusivo para membros' },
      { id: 4, value: 'Acesso livre de anúncios' },
    ],
  },
];

export const PagePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<IPlanData | null>(null);

  const handleSelectPlan = (id: number | null) => {
    const plan = plans.find((plan) => plan.id === id);
    setSelectedPlan(plan || null);
  };

  return (
    <LayoutDashboard>
      {/* Listagem de planos */}
      <div className="grid grid-cols-4 gap-4 font-butler">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-[#414142] p-4 hover:bg-primary cursor-pointer"
            onClick={() => handleSelectPlan(plan.id)}
          >
            <h2 className="text-3xl text-center mb-4">{plan.title}</h2>
            <h3 className="text-6xl text-center mb-4">
              <span className="text-3xl align-top">R$</span>
              {plan.price}
              <span className="text-3xl">/mês</span>
            </h3>
            <p className="text-center text-xl font-medium mb-4">{plan.description}</p>
            <hr className="border-t border-[#414142] my-4" />
            <ul>
              {plan.advantages.map((advantage) => (
                <li key={advantage.id} className="flex gap-2 items-center mb-4">
                  <MdCheckCircleOutline className="size-8 shrink-0" />
                  <p>{advantage.value}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div
          className="border border-[#414142] p-4 flex justify-center items-center hover:bg-primary cursor-pointer"
          onClick={() => handleSelectPlan(null)}
        >
          <p className="font-montserrat text-3xl">NOVO</p>
        </div>
      </div>
      <hr className="border-t border-[#414142] my-4" />
      {/* Formulário */}
      <CreatePlan selectedPlan={selectedPlan} />
    </LayoutDashboard>
  );
};
