import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FC } from 'react';

import { IPostData } from 'src/shared/api/posts/PostsService';

interface IPostInfoProps {
  post: IPostData;
}

export const PostInfo: FC<IPostInfoProps> = ({ post }) => {
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 300;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min de leitura`;
  };

  const meta = Array.isArray(post?.meta) && post?.meta.length > 0 ? post?.meta[0] : {};
  const feature_image_caption = meta.feature_image_caption;

  const editors = post.editors.map((editor) => editor.name).join(', ');
  const curators = post.curadors.map((curador) => curador.name).join(', ');

  const renderAuthors = () => (
    <div>
      <div className="flex gap-4 flex-wrap mt-5 items-center justify-between">
        <div>
          {/* Autores */}
          {post.admins.map((admin) => (
            <div key={admin.id} className="flex items-center gap-5">
              <img
                src={admin.avatar ?? ''}
                alt={`Autor ${admin.name}`}
                className="w-14 h-14 rounded-full bg-black object-cover"
              />
              <div className="flex gap-0 flex-col">
                <p className="font-montserrat text-sm text-zinc-500 leading-3">Autora</p>
                <p className="font-montserrat text-lg font-regular tracking-tighter">{admin.name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Data de publicação e tempo de leitura */}
        <div className="flex flex-col text-zinc-800 flex-wrap text-sm font-montserrat font-light">
          <p className="text-left sm:text-right">
            {post.published_at ? format(new Date(post.published_at), 'dd/MM/yyyy') : ''}
          </p>
          <span className="text-left sm:text-right">{calculateReadingTime(post.content)}</span>
          <p className="text-left sm:text-right">
            Atualizado{' '}
            {post.updated_at ? formatDistanceToNow(new Date(post.updated_at), { locale: ptBR, addSuffix: true }) : ''}
          </p>
        </div>
      </div>
      <div className="flex gap-1 sm:gap-2 flex-wrap my-4 items-center font-montserrat text-zinc-500">
        {editors && (
          <p className="text-sm leading-3">
            Editora{post.editors.length > 1 ? 's' : ''} <span>{editors}</span>
          </p>
        )}
        {editors && curators && <span>•</span>}
        {curators && (
          <p className="text-sm leading-3">
            Curadora{post.curadors.length > 1 ? 's' : ''} <span>{curators}</span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="relative my-8">
        {/* Assuntos */}
        <div className="hidden lg:block absolute top-1/2 left-4 transform -translate-y-1/2">
          <div className="transform -rotate-90 flex flex-col gap-0">
            {post.subjects.map((subject, index) => (
              <span className="text-nowrap font-montserrat" key={index}>
                {subject.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        {/* Corpo das informações da publicação */}
        <div className="container mx-auto max-w-[800px] px-4">
          <h1 className="text-4xl lg:text-7xl font-butler font-light mb-2 leading-[1.1em]">{post.title}</h1>
          <p className="text-lg font-montserrat font-light">{post.description}</p>
          <div className="hidden lg:block">{renderAuthors()}</div>
        </div>
      </div>
      <div className="px-0 lg:px-4">
        <div className="container mx-auto max-w-[800px] relative before:absolute before:inset-4 before:border before:border-[#f1ece8] before:content-['']">
          <img
            src={post.feature_image ?? ''}
            alt=""
            className={`w-full object-cover ${post.type === 'pilula' ? 'aspect-square' : 'aspect-video'}`}
          />
        </div>
      </div>
      <div
        className="mt-2 container max-w-[800px] mx-auto px-4 flex justify-center flex-wrap"
        dangerouslySetInnerHTML={{ __html: feature_image_caption ?? '' }}
      />
      <div className="container mx-auto max-w-[800px] px-4 block lg:hidden">{renderAuthors()}</div>
    </div>
  );
};
