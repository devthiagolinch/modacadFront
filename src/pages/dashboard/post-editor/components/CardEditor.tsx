import { AccordionItem } from '../../../../shared/components/ui/accordion/AccordionItem';
import { CardBasicInfo } from './CardBasicInfo';
import { CardMetaGoogle } from './CardMetaGoogle';
import { CardMetaOG } from './CardMetaOG';
import { CardTagInfo } from './CardTagInfo';

export const CardEditor = () => {
  return (
    <div className="col-span-4 fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-auto pt-16">
      <AccordionItem title="Informações básicas" open>
        <CardBasicInfo />
      </AccordionItem>
      <AccordionItem title="Meta Google">
        <CardMetaGoogle />
      </AccordionItem>
      <AccordionItem title="Meta OG">
        <CardMetaOG />
      </AccordionItem>
      <AccordionItem title="Tags">
        <CardTagInfo />
      </AccordionItem>
    </div>
  );
};
