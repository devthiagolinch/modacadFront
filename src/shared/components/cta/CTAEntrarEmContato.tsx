import mailIcon from '../../../assets/icons/email.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import setaCurvaIcon from '../../../assets/icons/seta-curva.svg';

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
          {/* E-mail */}
          <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
            <a
              href="mailto:telmabarcellos@modacad.com.br"
              className="flex gap-2 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mailIcon} alt="Ícone de e-mail" className="max-w-[24px]" />
              <p>telmabarcellos@modacad.com.br</p>
            </a>
          </li>

          {/* WhatsApp */}
          <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
            <a
              href="https://wa.me/5531996167573"
              className="flex gap-2 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsappIcon} alt="Ícone do WhatsApp" className="max-h-[24px]" />
              <p>31 99616 7573</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
