import { useEffect, useState } from 'react';
import checkListIcon from '../../assets/icons/check-mark.svg';

import { Footer } from '../../shared/components/footer';
import { Button } from '../../shared/components/Button';

import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';
import { IPlanData, PlansService } from '../../shared/api/plans/PlansService';
import { PlanCard } from './components/PlanCard';

export const PlansPage = () => {
  const [plans, setPlans] = useState<IPlanData[]>([]);

  useEffect(() => {
    PlansService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setPlans(response);
      console.log(response);
    });
  }, []);

  return (
    <div>
      <PublicHeader />

      <div className="flex flex-col justify-center align-center pt-28 pb-10 md:ml-32 md:w-auto ml-[5%]">
        <h1 className="font-butler_ultra_light md:text-[80px] text-[50px] leading-none -mb-3 md:-mb-0">
          Planos de Leitura
        </h1>
        <span className="md:text-[30px] text-[32px]  text-[#202020] font-extralight ">Plano básico gratuito</span>
      </div>

      <div className="hidden lg:flex lg:w-full lg:justify-center lg:items-center lg:my-">
        <p className="lg:text-[18px] lg:font-medium lg:flex items-center justify-center gap-2 w-full">
          <div className="border-t-[1px] border-[#202020] w-[10.5%]"></div>MELHOR PLANO
          <div className="border-t-[1px] border-[#202020] w-[10.5%]"></div>
        </p>
      </div>

      <div className="lg:flex lg:justify-center">
        {plans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} highlight={index === 1 ? true : false} />
        ))}
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
