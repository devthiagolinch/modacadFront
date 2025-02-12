import { Footer } from '../../../shared/components/footer';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';
import { DeskTopHeader } from './components/PillDesktopHeader';
import { MobileHeader } from './components/PillMobileHeader';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';

export const PillDetails = () => {
  window.scrollTo(0, 0);
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [pilula, setPilula] = useState<IPostData>();
  const [, setInstagramImage] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
          return;
        }
        setPilula(response);

        // Extrair a URL da imagem do post do Instagram
        const instagramUrl = response.content.match(/https:\/\/www\.instagram\.com\/p\/[^\/]+\//)?.[0];
        if (instagramUrl) {
          getInstagramPostImage(instagramUrl).then((imageUrl) => {
            setInstagramImage(imageUrl);
          });
        }
      });
    } else {
      navigate('/pilulas');
    }
  }, [postId]);

  const getInstagramPostImage = async (postUrl: string) => {
    try {
      const response = await fetch(`https://api.instagram.com/oembed?url=${postUrl}`);
      const data = await response.json();
      return data.thumbnail_url; // URL da imagem do post
    } catch (error) {
      console.error('Erro ao buscar a imagem do Instagram:', error);
      return null;
    }
  };

  return (
    <div className="mx-auto h-screen">
      <PublicHeader />
      <DeskTopHeader post={pilula} />
      <MobileHeader post={pilula} />

      <div className="lg:pt-12 lg:w-full flex justify-center items-center mb-16">
        <p
          className="text-justify lg:text-xl lg:min-w-[980px] w-full px-5 font-montserrat font-normal prose tiptap"
          dangerouslySetInnerHTML={{ __html: pilula?.content ?? '' }}
        />
      </div>
      <Footer showPlans showContact={false} />
    </div>
  );
};
