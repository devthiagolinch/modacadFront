import { format } from "date-fns";
import { IPostData } from "src/shared/api/posts/PostsService";

interface PostMobileHeaderInterface {
    post: IPostData | undefined;
}
  
export const PostMobileHeader: React.FC<PostMobileHeaderInterface> = ({ post }) => {
    function calculateReadingTime(text: string): string {
        const wordsPerMinute = 300; // Média de leitura (A velocidade média de leitura de um brasileiro é de 200 a 400 palavras por minuto (PPM). Um leitor comum leva cerca de um minuto para ler uma página, que normalmente tem cerca de 300 palavras. )
        const wordCount = text.split(/\s+/).length; // Conta palavras separadas por espaços
        const readingTime = Math.ceil(wordCount / wordsPerMinute); // Tempo em minutos arredondado para cima
      
        return `${readingTime} min de leitura`;
    }

    return (
        <div className="lg:hidden">
          <div className=" pt-16 pb-5 w-full px-5 grid gap-5">
            <h1 className="text-5xl font-butler font-extralight">{post?.title}</h1>

            <p className="text-left leading-[20px] text-lg font-montserrat font-light">{post?.description}</p>
          </div>

          <div className="flex flex-col ">
            <div className="flex w-full justify-center items-center">
              <div className="w-[95%] h-[180px] border-[1px] border-[#f1ece8] absolute "></div>
              <img
                src={post?.feature_image ?? ''}
                alt=""
                className="max-h-[200px] w-[100%]
                                border-[1px] border-inherit border-white
                                object-cover
                            "
              />
            </div>

            <div className="flex p-5 gap-[10px] items-center">
              {post?.admins &&
                Array.isArray(post.admins) &&
                post.admins.map((admin, index) => (
                  <div key={index} className="flex justify-center items-center align-middle gap-3">
                    <img
                      src={admin.avatar ?? ''}
                      alt=""
                      className="w-14 h-14 rounded-full flex items-center justify-center bg-black"
                    />
                    <p className="lg:-ml-3 lg:text-[20px] lg:font-montserrat font-medium tracking-[0.05em]">{admin.name}</p>
                  </div>
                ))}
            </div>

            <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
              <div className="flex flex-col font-montserrat_light_italic">
                {post?.subjects &&
                  Array.isArray(post.subjects) &&
                  post?.subjects.map((subject, index) => (
                    <span className="-mb-[5px] text-[13px]" key={index}>
                      {subject.name.toUpperCase()}
                    </span>
                  ))}
              </div>

              <div className="flex flex-col justify-center items-end">
                <p className="text-left lg:mr-2 font-montserrat font-light">
                    {post?.published_at ? format(new Date(post.published_at), 'dd/MM/yyyy') : ''} 
                </p>
                <span className="lg:ml-2 font-montserrat font-light">
                    {post?.content ? calculateReadingTime(post.content) : '0 min de leitura'}
                </span>
              </div>
            </div>
          </div>
        </div>
    )
}