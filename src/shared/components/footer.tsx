import { CTAEntrarEmContato } from './cta/CTAEntrarEmContato';
import { CTARedesSociais } from './cta/CTARedesSociais';
import { MySection } from './ui/my-section/MySection';

export function Footer() {
  return (
    <>
      <MySection invisibleBottomBorder>
        <CTARedesSociais />
      </MySection>
      <MySection invisibleBottomBorder>
        <CTAEntrarEmContato />
      </MySection>
      <MySection disableInternalPadding>
        <div className="container mx-auto font-montserrat py-8 px-4">
          <p className="font-montserrat font-medium">Copyright 2024 Modacad</p>
        </div>
      </MySection>
    </>
  );
}
