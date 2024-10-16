import React, { useEffect, useState } from 'react';

import { ScrollTextoMCD } from '../../shared/components/ScrollTextoMDC';
import { ScrollPilulaMCD } from '../../shared/components/ScrollPilulasMDC';
import { ScrollTextosMaisLidos } from '../../shared/components/ScrollTextoMaisLidos';
import { Footer } from '../../shared/components/footer';
import { LastPost } from '../../shared/components/last-post';
import { ReadingBox } from '../../shared/components/reagindBox';

import { ISubjectData, SubjectsService } from '../../shared/api/subjects/SubjectsService';

import banner from '../../assets/imgs/Banner-home.jpg';
import { PublicHeader } from '../../shared/components/header/PublicHeader';

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
      <PublicHeader />

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
