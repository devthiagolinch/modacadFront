import React from 'react';
import { IPostDataRequest } from '../../../../shared/api/posts/PostsService';
import { AccordionItem } from '../../../../shared/components/ui/accordion/AccordionItem';
import { CardBasicInfo } from './CardBasicInfo';
import { CardMetaGoogle } from './CardMetaGoogle';
import { CardMetaOG } from './CardMetaOG';
import { CardActions } from './CardActions';

interface ICardEditorProps {
  post: IPostDataRequest;
  setPost: React.Dispatch<React.SetStateAction<IPostDataRequest>>;
  postId?: string;
}

export const CardEditor: React.FC<ICardEditorProps> = ({ post, setPost, postId }) => {
  return (
    <div className="col-span-4 fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-auto pt-16">
      <div>
        <CardActions post={post} postId={postId} />
      </div>
      <AccordionItem title="Informações básicas" open>
        <CardBasicInfo post={post} setPost={setPost} />
      </AccordionItem>
      <AccordionItem title="Meta Google">
        <CardMetaGoogle post={post} setPost={setPost} />
      </AccordionItem>
      <AccordionItem title="Meta OG">
        <CardMetaOG post={post} setPost={setPost} />
      </AccordionItem>
    </div>
  );
};
