import React from 'react';
import { IPostDataRequest } from '../../../../shared/api/posts/PostsService';
import { AccordionItem } from '../../../../shared/components/ui/accordion/AccordionItem';
import { CardBasicInfo } from './CardBasicInfo';
import { CardMetaGoogle } from './CardMetaGoogle';
import { CardMetaOG } from './CardMetaOG';
import { CardTagInfo } from './CardTagInfo';

interface ICardEditorProps {
  post: IPostDataRequest;
  setPost: React.Dispatch<React.SetStateAction<IPostDataRequest>>;
  postId?: string;
}

export const CardEditor: React.FC<ICardEditorProps> = ({ post, setPost }) => {
  return (
    <div className="col-span-4 fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-auto pt-16">
      <AccordionItem title="Informações básicas" open>
        <CardBasicInfo post={post} setPost={setPost} />
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
