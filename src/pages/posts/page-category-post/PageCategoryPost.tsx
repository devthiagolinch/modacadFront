import { useEffect, useState } from 'react';

import { PostPresentation } from '../../../shared/components/posts/post-presentation/PostPresentation';
import { PublicHeader } from '../../../shared/components/header/public-header/PublicHeader';
import { IPostData, PostsService } from '../../../shared/api/posts/PostsService';

export const PageCategoryPost = () => {
  // Textos
  const [textos, setTextos] = useState<IPostData[]>([]);
  const [isLoadingTextos, setIsLoadingTextos] = useState(false);
  const [errorTextos, setErrorTextos] = useState(false);

  // Pílulas
  const [pilulas, setPilulas] = useState<IPostData[]>([]);
  const [isLoadingPilulas, setIsLoadingPilulas] = useState(false);
  const [errorPilulas, setErrorPilulas] = useState(false);

  useEffect(() => {
    setIsLoadingTextos(true);
    PostsService.getAll({ type: 'texto', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        setErrorTextos(true);
        setIsLoadingTextos(false);
        return;
      }
      setTextos(response.posts);
      setIsLoadingTextos(false);
      setErrorTextos(false);
    });
    PostsService.getAll({ type: 'pilula', status: 'published', order: 'desc' }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        setErrorPilulas(true);
        setIsLoadingPilulas(false);
        return;
      }
      setPilulas(response.posts);
      setIsLoadingPilulas(false);
      setErrorPilulas(false);
    });
  }, []);

  return (
    <div>
      <PublicHeader />
      <div className="container mx-auto p-4">
        <div className="flex gap-2 items-center">
          <h1 className="font-butler text-5xl mb-4">Categoria</h1>
          <hr className="grow border-t border-gray-950" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-7">
            <h2 className="font-light text-4xl mb-4">blogModacad</h2>
            <PostPresentation
              posts={textos}
              loading={isLoadingTextos}
              error={errorTextos}
              variant="list"
              tipo="texto"
            />
          </div>
          <div className="col-span-5">
            <h2 className="font-light text-4xl mb-4">pílulasModacad</h2>
            <PostPresentation
              posts={pilulas}
              loading={isLoadingPilulas}
              error={errorPilulas}
              variant="list"
              tipo="pilula"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
