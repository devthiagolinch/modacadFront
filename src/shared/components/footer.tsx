import { CTAEntrarEmContato } from './cta/CTAEntrarEmContato';
import { CTARedesSociais } from './cta/CTARedesSociais';

export function Footer() {
  return (
    <>
      <CTARedesSociais />
      <CTAEntrarEmContato />
      <div className="border-b border-gray-950">
        <div className="container mx-auto font-montserrat py-8 px-4">
          <p className="font-butler font-medium text-center">Copyright 2024 Modacad</p>
        </div>
      </div>
    </>
  );
}
