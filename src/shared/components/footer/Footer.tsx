import { FC } from 'react';
import { CTAApp } from '../cta/CTAApp';
import { CTAEntrarEmContato } from '../cta/CTAEntrarEmContato';
import { CTAPlans } from '../cta/CTAPlans';
import { CTARedesSociais } from '../cta/CTARedesSociais';
import { MySection } from '../ui/my-section/MySection';
import { Link } from 'react-router-dom';

interface IFooterProps {
  showPlans?: boolean;
  showContact?: boolean;
}

export const Footer: FC<IFooterProps> = ({ showPlans = false, showContact = true }) => {
  return (
    <div>
      <MySection invisibleBottomBorder>
        <CTAApp />
      </MySection>
      {showPlans && <CTAPlans />}
      <MySection invisibleBottomBorder>
        <CTARedesSociais />
      </MySection>
      {showContact && (
        <MySection invisibleBottomBorder>
          <CTAEntrarEmContato />
        </MySection>
      )}
      <MySection disableInternalPadding>
        <div className="container mx-auto font-montserrat py-8 px-4 flex justify-between items-center flex-col md:flex-row">
          <div className="flex flex-col md:flex-row gap-0 md:gap-4">
            <Link to="/politica-de-privacidade" className="text-gray-600 hover:text-gray-900">
              Política de Privacidade
            </Link>
            <Link to="/termos-e-condicoes" className="text-gray-600 hover:text-gray-900">
              Termos e Condições
            </Link>
          </div>
          <p className="font-montserrat font-medium">Copyright 2024 Modacad</p>
        </div>
      </MySection>
    </div>
  );
};
