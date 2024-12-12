import setaCurvaIcon from '../../../assets/icons/seta-curva.svg';
import logoEstendida from '../../../assets/logos/modacad-logo-estendida.svg';
import logotipo from '../../../assets/logos/modacad-logotipo.svg';

export const CTAApp = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between font-montserrat p-4">
      <div>
        <p className="text-7xl font-butler font-light">
          moldes
          <br />
          Modacad
        </p>
      </div>
      <img src={setaCurvaIcon} className="transform -scale-x-90 rotate-[216deg] md:scale-x-100 md:rotate-0" />
      <div className="flex gap-2 items-center">
        <div>
          <p className="font-light text-2xl mb-2">Como funciona</p>
          <div className="border-2 border-gray-950 p-4">
            <img src={logoEstendida} className="object-contain w-full h-full" />
          </div>
        </div>
        <div>
          <p className="font-light text-2xl mb-2">Conheça o app</p>
          <div className="border-2 border-gray-950 p-4">
            <img src={logotipo} className="object-contain w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
