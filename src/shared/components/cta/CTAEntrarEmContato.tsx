import setaCurvaIcon from '../../../assets/icons/seta-curva.svg';

import emailIcon from '../../../assets/icons/email.svg';
import wppIcon from '../../../assets/icons/whatsapp.svg';

export const CTAEntrarEmContato = () => {
  return (
    <div className="container mx-auto font-montserrat px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col justify-center items-center md:items-start">
        <p className="text-6xl md:text-7xl font-butler font-light">
          Quer falar
          <br />
          comigo?
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={setaCurvaIcon} className="transform -scale-x-90 rotate-[216deg] md:scale-x-100 md:rotate-0" />
      </div>
      <div className="flex items-center overflow-hidden">
        <ul>
          <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
            <img src={emailIcon} alt="" className="max-w-[24px]" />
            <p className="">telmabarcellos@modacad.com.br</p>
          </li>
          <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
            <img src={wppIcon} alt="" className="max-h-[24px]" />
            31 99616 7573
          </li>
        </ul>
      </div>
    </div>
  );
};
