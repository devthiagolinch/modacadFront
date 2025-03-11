import React from 'react';
import { IPostDataRequest } from '../../../../shared/api/posts/PostsService';
import { AccordionItem } from '../../../../shared/components/ui/accordion/AccordionItem';
import { CardBasicInfo } from './CardBasicInfo';
import { CardMetaGoogle } from './CardMetaGoogle';
import { CardMetaOG } from './CardMetaOG';
import { CardTagInfo } from './CardTagInfo';

interface ICardEditorProps {
  post: IPostDataRequest;
}

export const CardEditor: React.FC<ICardEditorProps> = ({ post }) => {
  return (
    <div className="col-span-4 fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-auto pt-16">
      <AccordionItem title="Informações básicas" open>
        <CardBasicInfo title="Testando" feature_image="" content="" image_caption="" />
      </AccordionItem>
      <AccordionItem title="Meta Google">
        <CardMetaGoogle isVisible={true} props={post} />
      </AccordionItem>
      <AccordionItem title="Meta OG">
        <CardMetaOG isVisible={true} props={post} onChange={() => {}} />
      </AccordionItem>
      <AccordionItem title="Tags">
        <CardTagInfo onClose={() => {}} onUpdated={() => {}} selectedTag={null} />
      </AccordionItem>
    </div>
  );
};
