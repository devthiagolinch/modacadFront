import { Footer } from '../../shared/components/footer';
import { Button } from '../../shared/components/Button';

import checkListIcon from '../../assets/icons/check-mark.svg';
import { useEffect, useState } from 'react';
import { api } from '../../shared/services/axios';
import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';

interface Planos {
  id: string;
  title: string;
  description: string;
  topics: string[];
  price: string;
}

export function Plans() {
  const [plan, setPlan] = useState<Planos>();

  useEffect(() => {
    api.get('/planos').then((response) => setPlan(response.data));
  }, []);
  console.log(plan);

  return (
    <div>
      <PublicHeader />

      <div
        className="
                flex flex-col justify-center align-center
                pt-28 pb-10 md:ml-32 md:w-auto ml-[5%]
                "
      >
        <h1
          className="font-butler_ultra_light md:text-[80px] text-[50px] leading-none
                -mb-3 md:-mb-0"
        >
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
        <div
          className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]
                    border-[1px] border-b-0 md:border-b-[1px] md:border-r-0 border-zinc-950"
        >
          <div className="flex items-center justify-center ">
            <p className="font-butler_ultra_light text-[30px]">Premium Trimestral</p>
          </div>
          <div className="flex justify-center items-end">
            <div className="flex -mb-12">
              <span className="text-[50px] font-butler_ultra_light">R$</span>
              <p className="text-[150px] font-butler_ultra_light">8</p>
            </div>
            <p className="justify-self-end text-[50px] font-butler_ultra_light">/mês</p>
          </div>

          <p className="text-[25px] font-butler_ultra_light mt-[30px] mb-[40px]">Escolha flexível</p>

          <div className="mb-[40px] px-5">
            <ul className="flex flex-col gap-[15px]">
              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Todas as vantagens do plano Todas as vantagens do plano
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Todas as vantagens do plano{' '}
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" /> Todas as vantagens do plano
              </li>
            </ul>
          </div>

          <Button title="Quero este" key={3} active={false} />
        </div>

        <div
          className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]
                    shadow-read
                    border-[1px] border-zinc-950"
        >
          <div className="md:hidden w-full">
            <p className="text-[16px] font-medium items-center justify-center gap-2 flex w-full">
              <div className="border-t-[1px] border-[#202020] w-[25%]"></div>MELHOR PLANO
              <div className="border-t-[1px] border-[#202020] w-[25%]"></div>
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <p className="font-butler_ultra_light text-[30px]">Premium Anual</p>
          </div>
          <div className="flex justify-center items-end">
            <div className="flex -mb-12">
              <span className="text-[50px] font-butler_ultra_light">R$</span>
              <p className="text-[150px] font-butler_ultra_light">8</p>
            </div>
            <p className="justify-self-end text-[50px] font-butler_ultra_light">/mês</p>
          </div>

          <p className="text-[25px] font-butler_ultra_light mt-[30px] mb-[40px]">Acesso descomplicado</p>

          <div className="mb-[40px] px-5">
            <ul className="flex flex-col gap-[15px]">
              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Todas as vantagens do plano Todas as vantagens do plano
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Todas as vantagens do plano{' '}
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" /> Todas as vantagens do plano
              </li>
            </ul>
          </div>

          <Button title="Quero este" key={2} active={true} />
        </div>

        <div
          className="w-full h-auto flex flex-col justify-center items-center
                    pt-[30px] pb-[40px]
                    border-[1px] border-t-0 md:border-t-[1px] md:border-l-0 border-zinc-950"
        >
          <div className="flex items-center justify-center ">
            <p className="font-butler_ultra_light text-[30px]">Básico</p>
          </div>
          <div className="flex justify-center items-end">
            <div className="flex -mb-12">
              <span className="text-[50px] font-butler_ultra_light">R$</span>
              <p className="text-[150px] font-butler_ultra_light">0</p>
            </div>
            <p className="justify-self-end text-[50px] font-butler_ultra_light">/mês</p>
          </div>

          <p className="text-[25px] font-butler_ultra_light mt-[30px] mb-[40px]">Garanta essas vantagens</p>

          <div className="mb-[40px] px-5">
            <ul className="flex flex-col gap-[15px]">
              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Leitura completa dos textos publicados
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" />
                Opção de receber os textos no seu e-mail{' '}
              </li>

              <li className="flex gap-4 text-[22px] items-stretch align-middle leading-tight">
                <img src={checkListIcon} alt="" className="h-[30px]" /> Opção de notificação de novos textos no seu
                e-mail
              </li>
            </ul>
          </div>

          <Button title="Quero este" key={1} active={false} />
        </div>
      </div>

      <div
        className="
                flex flex-col gap-2 justify-center items-start mx-[20px]
                md:px-32 md:mx-0 md:pb-[70px]
                md:border-l-[1px] md:border-r-[1px] border-zinc-950
            "
      >
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
}
