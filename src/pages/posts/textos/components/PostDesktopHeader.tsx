import { format } from "date-fns";
import { IPostData } from "../../../../shared/api/posts/PostsService";

interface PostDeskTopHeaderInterface {
    post: IPostData | undefined;
}

export const PostDeskTopHeader: React.FC<PostDeskTopHeaderInterface> = ({ post }) => {
    function calculateReadingTime(text: string): string {
        const wordsPerMinute = 300; // Média de leitura (A velocidade média de leitura de um brasileiro é de 200 a 400 palavras por minuto (PPM). Um leitor comum leva cerca de um minuto para ler uma página, que normalmente tem cerca de 300 palavras. )
        const wordCount = text.split(/\s+/).length; // Conta palavras separadas por espaços
        const readingTime = Math.ceil(wordCount / wordsPerMinute); // Tempo em minutos arredondado para cima
      
        return `${readingTime} min de leitura`;
    }

    return (
        <div className="hidden lg:flex lg:flex-col  lg:w-full">
          <div className="lg:flex  lg:pb-5 2xl:gap-[14.5%] lg:gap-[12%] lg:justify-between">
            <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto">
              {post?.subjects &&
                Array.isArray(post.subjects) &&
                post?.subjects.map((subject, index) => (
                  <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap text-lg" key={index}>
                    {subject.name.toUpperCase()}
                  </span>
                ))}
            </div>
            <div className="lg:flex lg:flex-col lg:pr-[20%] ">
              <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                {post?.title}
              </h1>

              <p className="lg:text-left lg:text-[20px] w-[100%] lg:font-montserrat_regular">{post?.description}</p>
            </div>
          </div>

          <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
            <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
              {post?.admins &&
                Array.isArray(post.admins) &&
                post.admins.map((admin, index) => (
                  <div key={index} className="flex justify-center align-middle items-center gap-5">
                    <img
                      src={admin.avatar ?? ''}
                      alt=""
                      className="w-14 h-14 rounded-full flex items-center justify-center bg-black"
                    />
                    <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">{admin.name}</p>
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

          <div className="flex justify-center items-center pl-[20px]">
            <div className="lg:h-[370px] lg:w-[730px] border-[1px] border-[#f1ece8] absolute "></div>
            <img src={post?.feature_image ?? ''} alt="" className="lg:h-[400px] lg:w-[760px] object-cover" />
          </div>
          <div className="flex w-full justify-center align-middle items-center gap-5 mt-5">
                {post?.editors && Array.isArray(post.editors) &&
                    post.editors.map((editor, index) => (
                    <div key={index} className="flex align-middle justify-center items-center gap-7">
                        <span className="lg:-ml-3 lg:text-2 lg:font-montserrat font-medium tracking-[0.05em]">Editor: {editor.name}</span>
                    </div>
                ))}
                {post?.curadors && Array.isArray(post.editors) &&
                    post.curadors.map((curador, index) => (
                    <div key={index} className="flex align-middle justify-center items-center gap-7">
                        <span className="lg:-ml-3 lg:text-2 lg:font-montserrat font-medium tracking-[0.05em]">Curador: {curador.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}