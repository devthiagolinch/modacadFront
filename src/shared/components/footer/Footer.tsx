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
        <div className="container mx-auto font-montserrat py-8 px-4 flex justify-between items-center">
          <p className="font-montserrat font-medium">Copyright 2024 Modacad</p>
          <div className="flex space-x-4">
            <Link to="/termos-e-condicoes" className="text-gray-600 hover:text-gray-900">
              Termos e Condições
            </Link>
            <Link to="/politica-de-privacidade" className="text-gray-600 hover:text-gray-900">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </MySection>
    </div>
  );
};
