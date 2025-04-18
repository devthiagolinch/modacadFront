import { useEffect, useState } from 'react';

import { Footer } from '../../shared/components/footer/Footer';

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
    if (!user) {
      return;
    }

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

      <div className="flex flex-col justify-center align-center container mx-auto px-4 mb-12 mt-32">
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
            <h1 className="font-butler_ultra_light text-[30px]">Quais são as formas de pagamento?</h1>
            <p className="text-[20px] font-regular">
              Aceitamos pagamentos por meio do Mercado Pago, garantindo segurança e praticidade. Para os planos mensais,
              o pagamento deve ser feito exclusivamente via cartão de crédito. Já para o plano anual, oferecemos mais
              flexibilidade, permitindo o pagamento por cartão de crédito, PIX ou boleto, além de outras formas
              disponíveis no Mercado Pago.
            </p>
          </div>
        </div>

        <div className="md:w-[100%]">
          <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]">
            <h1 className="font-butler_ultra_light text-[30px]">
              Como recebo meu comprovante de pagamento e minha nota fiscal?
            </h1>
            <p className="text-[20px] font-regular">
              Você recebe esta documentação por email a cada etapa concluída no sistema Mercado pago.
            </p>
          </div>
        </div>

        <div className="md:w-[100%]">
          <div className="md:flex md:flex-col py-[30px] border-t-[1px] border-zinc-950 md:w-[100%]">
            <h1 className="font-butler_ultra_light text-[30px]">Como posso falar com vocês?</h1>
            <p className="text-[20px] font-regular">
              Você pode entrar em contato conosco pelo WhatsApp 31 99616 7573 ou pelo email para
              telmabarcellos@modacad.com.br. Responderemos o mais breve possível.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
