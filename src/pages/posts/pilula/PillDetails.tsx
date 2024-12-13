import { Footer } from '../../../shared/components/footer';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { DeskTopHeader } from './components/PillDesktopHeader';
import { MobileHeader } from './components/PillMobileHeader';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';

export const PillDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [pilula, setPilula] = useState<IPostData>();

  useEffect(() => {
    if (postId) {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
          return;
        }
        setPilula(response);
      });
    } else {
      navigate('/pilulas');
    }
  }, [postId]);

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      <DeskTopHeader post={pilula} />
      <MobileHeader post={pilula} />

      <div className="lg:pt-12 lg:w-full flex justify-center items-center">
        <p
          className="text-justify lg:text-xl lg:min-w-[980px] w-full px-5 font-montserrat font-normal prose tiptap"
          dangerouslySetInnerHTML={{ __html: pilula?.content ?? '' }}
        />
      </div>
      <Footer />
    </div>
  );
};
