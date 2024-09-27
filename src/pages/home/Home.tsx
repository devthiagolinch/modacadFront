import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ScrollTextoMCD } from '../../shared/components/ScrollTextoMDC';
import { ScrollPilulaMCD } from '../../shared/components/ScrollPilulasMDC';
import { ScrollTextosMaisLidos } from '../../shared/components/ScrollTextoMaisLidos';
import { Footer } from '../../shared/components/footer';
import { LastPost } from '../../shared/components/last-post';
import { ReadingBox } from '../../shared/components/reagindBox';

import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';

import banner from '../../assets/imgs/Banner-home.jpg';
import telmaLogoDesk from '../../assets/svg/HOME logo TELMA BARCELLOS modacad.svg';
import telmaLogoDMobile from '../../assets/svg/MOBILE Logo TELMA BARCELLOS modacad.svg';

export function Home() {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);

  useEffect(() => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setSubjects(response);
    });
  }, []);

  return (
    <div className="mx-auto h-screen">
      <div
        className="flex lg:items-center w-[100%] h-[90px] border-b-[1px] border-l-[1px] border-r-[1px] border-[#202020] bg-[#f1ece8]
          shadow-read
      "
      >
        <div className="flex w-screen justify-between ">
          {/* DESKTOP LOGO */}
          <div className="hidden lg:flex-1 justify-center items-center lg:flex">
            <Link to={'/'} className="h-[60px]">
              <img src={telmaLogoDesk} />
            </Link>
          </div>

          {/* DESKTOP LOGO */}
          <div className="lg:hidden flex-1 justify-center items-center flex">
            <Link to={'/'} className="w-[60px]">
              <img src={telmaLogoDMobile} />
            </Link>
          </div>

          <nav className="flex items-center">
            <Link
              to="/dashboard"
              className="hidden lg:flex font-normal text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-5 py-7 tracking-[0.05em]
                      bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]
                  "
            >
              Meu Perfil
            </Link>
            <a
              href=""
              className="hidden lg:flex font-normal border-l-2  lg:text-sm lg:border lg:border-r-0 lg:border-b-0 lg:border-t-0 lg:border-zinc-950 md:w-50 md:h-20 lg:px-5 lg:py-7
                      bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%] tracking-[0.05em]
                  "
            >
              Criar Perfil
            </a>
            <Link
              to="/plans"
              className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-6 pt-7
                      hover:bg-[#dcdf1e]
                  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.0"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
            <a
              href=""
              className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-[30px]
                        hover:bg-[#dcdf1e]
                  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </a>
            <a
              href=""
              className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-7
                        hover:bg-[#dcdf1e]
                  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      <img src={banner} alt="" className="min-w-full max-h-[650px] object-cover" />

      <ReadingBox />

      <LastPost />

      <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px] min-h-[300px]">
        <div className="flex justify-start items-center border-[1px] px-[8.3px] pt-16 border-[#202020] -mr-[1px] -mt-[1px] -mb-[1px] align-middle">
          <p
            className="
            transform: -rotate-90 lg:w-[22px]"
          >
            ASSUNTOS
          </p>
        </div>

        <div
          className="font-butler_ultra_light  lg:text-[40px] leading-[60px]
        w-full items-center align-middle p-[60px]"
        >
          {subjects.map((sub) => {
            return (
              <React.Fragment key={sub.id}>
                <a
                  className="px-2 lg:px-5
                                bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:120%_.60em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_95%]
                              "
                >
                  {sub.name}
                </a>
                <span className="text-2xl">•</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <ScrollTextosMaisLidos title={'TEXTOS MAIS LIDOS'} />

      <ScrollTextoMCD title={'TEXTO PUBLICADOS'} />

      <ReadingBox />

      <ScrollPilulaMCD title={'PILULAS MODACAD'} />

      <div className="h-96"></div>

      <Footer />
    </div>
  );
}
