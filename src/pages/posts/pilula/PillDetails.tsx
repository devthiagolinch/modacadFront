import { Footer } from '../../../shared/components/footer';
import { Header } from '../../../shared/components/header';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { DeskTopHeader } from './components/PillDesktopHeader';
import { MobileHeader } from './components/PillMobileHeader';

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
      <Header />
      <DeskTopHeader post={pilula} />
      <MobileHeader post={pilula} />

      <div className="lg:pt-12 lg:w-full flex justify-center items-center">
        <p
          className="lg:text-justify lg:text-lg lg:min-w-[995px] w-full px-5 overflow-hidden font-montserrat font-light prose"
          dangerouslySetInnerHTML={{ __html: pilula?.content ?? '' }}
        />
      </div>
      <Footer />
    </div>
  );
};
