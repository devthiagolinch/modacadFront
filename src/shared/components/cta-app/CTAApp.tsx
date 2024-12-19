import setaCurvaIcon from '../../../assets/icons/seta-curva.svg';
import logoEstendida from '../../../assets/logos/modacad-logo-estendida.svg';
import logotipo from '../../../assets/logos/modacad-logotipo.svg';

export const CTAApp = () => {
  return (
    <div className="container mx-auto font-montserrat px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col justify-center items-center md:items-start">
        <p className="text-6xl md:text-7xl font-butler font-light">
          moldes
          <br />
          Modacad
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={setaCurvaIcon} className="transform -scale-x-90 rotate-[216deg] md:scale-x-100 md:rotate-0" />
      </div>
      <div className="flex justify-end items-center gap-4 justify-center md:justify-start flex-wrap">
        <div>
          <p className="font-light text-2xl mb-2">Como funciona</p>
          <a href="https://www.modacad.com.br/#como-funciona" target="_blank" rel="noopener noreferrer">
            <div className="border border-gray-950 p-4 hover:bg-primary">
              <img src={logoEstendida} className="object-contain w-full h-full" />
            </div>
          </a>
        </div>
        <div>
          <p className="font-light text-2xl mb-2">Conheça o app</p>
          <a href="https://app.modacad.com.br/" target="_blank" rel="noopener noreferrer">
            <div className="border border-gray-950 p-4 hover:bg-primary">
              <img src={logotipo} className="object-contain w-full h-full" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
