import { ServiceData } from '../../assets/utils/constants.index';
import { Header } from '../../shared/components/header';
import { TextoMocadCard } from '../../shared/components/cards/textoModacadCard';
import { Footer } from '../../shared/components/footer';
import { Link } from 'react-router-dom';
import { ReadingBox } from '../../shared/components/reagindBox';
import { Button } from '../../shared/components/Button';

export function PopularPosts() {
  const data = ServiceData;

  return (
    <div className="">
      <Header />

      <div
        className="lg:flex lg:flex-col
                justify-center items-center -mb-[1px]
            "
      >
        <div className="w-full flex items-center px-[10px] mt-5 lg:px-[115px]">
          <h1 className="font-butler_ultra_light text-[26px] md:text-[40px]">Textos mais lidos</h1>
          <div className="w-[40%] lg:w-[65%] h-0 border-t-[1px] ml-[20px] border-[#202020]"></div>
        </div>

        <div className="lg:grid lg:grid-cols-2 mt-5 flex flex-col justify-center items-center lg:px-20">
          {data.map((texto) => (
            <Link to={`/postsmodacad/${texto.id}`}>
              <TextoMocadCard
                id={texto.id}
                banner={texto.backgroundImage}
                title={texto.title}
                description={texto.description}
                tags={texto.tag}
              />
            </Link>
          ))}
        </div>
        <div className="lg:mb-[80px] lg:mt-[60px] mt-[25px] mb-[50px] justify-center items-center flex">
          <Button title={'Carregar mais'} active={false} />
        </div>
      </div>

      <ReadingBox />
      <Footer />
    </div>
  );
}