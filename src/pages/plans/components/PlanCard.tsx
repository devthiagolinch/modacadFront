import { FC } from 'react';
import checkListIcon from '../../../assets/icons/check-mark.svg';

import { IPlanData } from '../../../shared/api/plans/PlansService';
import { Button } from '../../../shared/components/Button';

interface IPlanCardProps {
  plan: IPlanData;
  highlight?: boolean;
}

export const PlanCard: FC<IPlanCardProps> = ({ plan, highlight = false }) => {
  return (
    <div
      className={
        'w-full h-auto flex flex-col justify-center items-center pt-[30px] pb-[40px] border-[1px] border-b-0 md:border-b-[1px] md:border-r-0 border-zinc-950' +
        (highlight ? ' shadow-read' : '')
      }
    >
      <div className="flex items-center justify-center">
        <p className="font-butler_ultra_light text-[30px]">{plan.title}</p>
      </div>
      <div className="flex justify-center items-end">
        <div className="flex -mb-12">
          <span className="text-[50px] font-butler_ultra_light">R$</span>
          <p className="text-[150px] font-butler_ultra_light">{plan.price}</p>
        </div>
        <p className="justify-self-end text-[50px] font-butler_ultra_light">{plan.frequency > 1 ? '/ano' : '/mês'}</p>
      </div>
      <p className="text-[25px] font-butler_ultra_light mt-[30px] mb-[40px]">{plan.description}</p>
      <div className="mb-[40px] px-5">
        <ul className="flex flex-col gap-[15px]">
          {plan.topics.map((topic, index) => (
            <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight" key={index}>
              <img src={checkListIcon} alt="" className="h-[30px]" />
              {topic}
            </li>
          ))}
        </ul>
      </div>
      <a href={plan.mp_url} target="_blank">
        <Button title="Quero este" active={false} />
      </a>
    </div>
  );
};
