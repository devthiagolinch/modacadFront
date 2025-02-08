import { FC } from 'react';

import { IPlanData, PlansService } from '../../../shared/api/plans/PlansService';

import checkListIcon from '../../../assets/icons/check-mark.svg';

interface IPlanCardProps {
  plan: IPlanData;
  highlight?: boolean;
  isFirst: boolean;
}

export const PlanCard: FC<IPlanCardProps> = ({ plan, highlight = false, isFirst = false }) => {
  const handleGeneratePaymentLink = async (planId: string) => {
    const paymentLink = await PlansService.generatePaymentLink(planId);

    if (paymentLink instanceof Error) {
      console.error(paymentLink);
      return;
    }

    window.location.href = paymentLink;
  };

  return (
    <div
      className={`flex flex-col items-center p-8 ${!isFirst ? 'border-l-0' : ''} ${highlight ? ' shadow-read' : ''} border border-zinc-950`}
    >
      <p className="font-butler text-5xl text-center">{plan.title}</p>
      <div className="flex items-center leading-none items-center gap-2 mt-12">
        <span className="text-5xl font-butler self-start mt-3 font-light">R$</span>
        <p className="font-butler text-9xl">{plan.price}</p>
        <span className="text-5xl font-butler self-end mb-3 font-light">{plan.frequency > 1 ? '/ano' : '/mês'}</span>
      </div>
      <p className="font-butler font-medium text-3xl mt-4">Escolha flexível</p>
      <hr className="my-8 h-1 border-t border-gray-950 w-full" />
      <div>
        <ul className="flex gap-2 flex-col mb-8">
          {plan.topics.map((topic, index) => (
            <li className="flex gap-2 text-lg leading-tight font-montserrat font-light items-center" key={index}>
              <img src={checkListIcon} alt="" className="h-[30px]" />
              {topic.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() => handleGeneratePaymentLink(plan.id)}
          className="px-8 py-4 border border-gray-950 font-montserrat text-lg hover:bg-[#dcdf1e]"
        >
          Quero este
        </button>
      </div>
    </div>
  );
};
