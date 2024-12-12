import { IPostData } from "src/shared/api/posts/PostsService";
import React from 'react';
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface MobileHeaderInterface {
    post: IPostData | undefined;
}
  
export const MobileHeader: React.FC<MobileHeaderInterface> = ({ post }) => {
    function calculateReadingTime(text: string): string {
        const wordsPerMinute = 300; // Média de leitura (A velocidade média de leitura de um brasileiro é de 200 a 400 palavras por minuto (PPM). Um leitor comum leva cerca de um minuto para ler uma página, que normalmente tem cerca de 300 palavras. )
        const wordCount = text.split(/\s+/).length; // Conta palavras separadas por espaços
        const readingTime = Math.ceil(wordCount / wordsPerMinute); // Tempo em minutos arredondado para cima
      
        return `${readingTime} min de leitura`;
    }

    return (
        <div className="lg:hidden">
        <div className=" pt-7 pb-5 w-full px-5 grid gap-5">
          <h1 className="text-4xl font-butler font-light">{post?.title}</h1>

          <p className="text-left leading-[20px] font-montserrat font-light">{post?.description}</p>
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-center items-center">
            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute "></div>
            <img
              src={post?.feature_image ?? ''}
              alt=""
              className="min-h-60 max-h-60 max-w-60
                              border-[1px] border-inherit border-white
                              object-cover
                          "
            />
          </div>

          <div className="flex p-5 items-center">
            {post?.admins &&
              Array.isArray(post.admins) &&
              post.admins.map((admin, index) => (
                <div key={index} className="flex justify-center items-center align-middle gap-5">
                  <img
                    src={admin.avatar ?? ''}
                    alt=""
                    className="w-14 h-14 rounded-full flex items-center justify-center bg-black"
                  />
                  <p className="tracking-[0.05em]">{admin.name}</p>
                </div>
              ))}
          </div>

          <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
            <div className="flex flex-col font-montserrat font-extralight">
              {post?.subjects.map((subject) => (
                                  <Link to={"/"} className="-mb-[5px]">{subject.name}</Link>
                              ))}
            </div>

            <div className="flex flex-col justify-between items-end">
            <p className="text-left -mb-[5px] font-montserrat font-light">
                {post?.published_at ? format(new Date(post.published_at), 'dd/MM/yyyy') : ''} 
              </p>
              <span className="font-montserrat font-light">
                {post?.content ? calculateReadingTime(post.content) : '0 min de leitura'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
}