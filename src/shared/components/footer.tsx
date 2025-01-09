import { FC } from 'react';
import { CTAApp } from './cta/CTAApp';
import { CTAEntrarEmContato } from './cta/CTAEntrarEmContato';
import { CTAPlans } from './cta/CTAPlans';
import { CTARedesSociais } from './cta/CTARedesSociais';
import { MySection } from './ui/my-section/MySection';

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
        <div className="container mx-auto font-montserrat py-8 px-4">
          <p className="font-montserrat font-medium">Copyright 2024 Modacad</p>
        </div>
      </MySection>
    </div>
  );
};
