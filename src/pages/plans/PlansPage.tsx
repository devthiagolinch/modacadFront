import { useEffect, useState } from 'react';

import { Footer } from '../../shared/components/footer';

import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';
import { IPlanData, PlansService } from '../../shared/api/plans/PlansService';
import { UsersService } from '../../shared/api/users/UserServices';
import { PlanCard } from './components/PlanCard';
import { useUser } from '../../shared/contexts';

export const PlansPage = () => {
  const [plans, setPlans] = useState<IPlanData[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    PlansService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setPlans(response);
    });
  }, []);

  useEffect(() => {
    UsersService.getProfile().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }

      if (response?.plans?.id) {
        setCurrentPlanId(response.plans.id);
      } else {
        const freePlan = plans.find((plan) => Number(plan.price) === 0);
        if (freePlan) {
          setCurrentPlanId(freePlan.id);
        }
      }
    });
  }, [user, plans]);

  return (
    <div>
      <PublicHeader />

      <div className="flex flex-col justify-center align-center container mx-auto px-4 my-12">
        <h1 className="font-butler text-7xl -mb-3 md:-mb-0">Planos de Leitura</h1>
        <span className="text-3xl text-gray-950 font-montserrat font-light mt-2">Plano básico gratuito</span>
      </div>

      <div className="hidden lg:flex lg:w-full lg:justify-center lg:items-center lg:mb-5">
        <div className="text-lg flex items-center justify-center gap-2 w-full">
          <div className="border-t border-gray-950 w-[8%]"></div>
          <span className="font-montserrat text-[20px]">MELHOR PLANO</span>
          <div className="border-t border-gray-950 w-[8%]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              highlight={index === 1 ? true : false}
              isFirst={index === 0}
              currentPlan={currentPlanId === plan.id}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-start mx-[20px] md:px-32 md:mx-0 md:pb-[70px] md:border-l-[1px] md:border-r-[1px] border-zinc-950">
        <p className="text-[35px] font-butler_ultra_light lg:text-[45px] md:my-[40px]">Perguntas frequentes</p>
        <div className="md:w-[100%]">
          <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]">
            <h1 className="font-butler_ultra_light text-[30px]">
              Como recebo meu comprovante de pagamento e minha nota fiscal?
            </h1>
            <p className="text-[20px] font-regular">Você pode pagar via PIX, boleto ou cartão de crédito.</p>
          </div>
        </div>

        <div className="md:w-[100%]">
          <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]">
            <h1 className="font-butler_ultra_light text-[30px]">
              Como recebo meu comprovante de pagamento e minha nota fiscal?
            </h1>
            <p className="text-[20px] font-regular">Você pode pagar via PIX, boleto ou cartão de crédito.</p>
          </div>
        </div>

        <div className="md:w-[100%]">
          <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]">
            <h1 className="font-butler_ultra_light text-[30px]">
              Como recebo meu comprovante de pagamento e minha nota fiscal?
            </h1>
            <p className="text-[20px] font-regular">Você pode pagar via PIX, boleto ou cartão de crédito.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
