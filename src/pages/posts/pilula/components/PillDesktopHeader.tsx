import { IPostData } from "src/shared/api/posts/PostsService";
import React from 'react';
import { format } from "date-fns";

interface DeskTopHeaderInterface {
    post: IPostData | undefined;
}
  
export const DeskTopHeader: React.FC<DeskTopHeaderInterface> = ({ post }) => {
    function calculateReadingTime(text: string): string {
        const wordsPerMinute = 300; // Média de leitura (A velocidade média de leitura de um brasileiro é de 200 a 400 palavras por minuto (PPM). Um leitor comum leva cerca de um minuto para ler uma página, que normalmente tem cerca de 300 palavras. )
        const wordCount = text.split(/\s+/).length; // Conta palavras separadas por espaços
        const readingTime = Math.ceil(wordCount / wordsPerMinute); // Tempo em minutos arredondado para cima
      
        return `${readingTime} min de leitura`;
    }

    return (
        <div className="hidden lg:flex lg:flex-col  lg:w-full">
            <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
            {/** tentar subir um pouco as subjects para ficar alinhado com a descrição */}
            <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
                {post?.subjects.map((subject) => (
                <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">{subject.name.toUpperCase()}</span>
                ))}
            </div>
            <div className="lg:flex lg:flex-col lg:pr-[20%] w-full px-10 justify-center">
                <h1 className="lg:text-7xl lg:font-butler font-light lg:my-14 lg:mb-[30px] lg:leading-[80px]">
                {post?.title}
                </h1>

                <p className="lg:text-justify lg:text-[20px] w-[100%] font-montserrat font-light">{post?.description}</p>
            </div>
            </div>

            <div className="flex align-middle lg:justify-evenly gap-32">
                <div className="flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                    {post?.admins &&
                    Array.isArray(post.admins) &&
                    post.admins.map((admin, index) => (
                        <div key={index} className="flex align-middle justify-center items-center gap-7">
                        <img
                            src={admin.avatar ?? ''}
                            alt=""
                            className="w-14 h-14 rounded-full flex items-center justify-center bg-black"
                        />
                        <p className="lg:-ml-3 lg:text-[20px] lg:font-montserrat font-medium tracking-[0.05em]">{admin.name}</p>
                        </div>
                    ))}
                </div>

                    <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                    <p className="text-left lg:mr-2">
                        {post?.published_at ? format(new Date(post.published_at), 'dd/MM/yyyy') : ''} 
                        </p>
                        <span>•</span>
                        <span className="lg:ml-2">
                            {post?.content ? calculateReadingTime(post.content) : '0 min de leitura'}
                        </span>
                        <div className="lg:grid lg:items-end"></div>
                    </div>
            </div>

            <div className="flex w-full justify-center items-center bg-contain bg-center">
                <div className="w-[380px] h-[380px] border-[1px] border-[#f1ece8] absolute ">
                    
                </div>
                <img src={post?.feature_image ?? ''} className="w-[400px] h-[400px] object-cover " />
            </div>
        </div>
    )
}