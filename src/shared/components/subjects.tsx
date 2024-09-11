import { useEffect, useState } from 'react';
import { api } from '../services/api/lib/axios';

interface Subjects {
  id: string;
  name: string;
}

export function Subjects() {
  const [subjects, setSubjects] = useState<Subjects[]>([]);

  useEffect(() => {
    api.get('/subjects').then((response) => setSubjects(response.data));
  }, []);

  return (
    <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px]">
      <div className="flex justify-start items-center border-[1px] px-[8.3px] border-[#202020] -mr-[1px] -mt-[1px] -mb-[1px] align-middle">
        <p
          className="
                transform: -rotate-90 lg:w-[22px]"
        >
          ASSUNTOS
        </p>
      </div>

      <div
        className="
            grid-cols-4
            h-auto lg:w-full items-center align-middle p-[60px] pr-0"
      >
        {subjects.map((sub) => {
          return (
            <>
              <a
                href=""
                key={sub.id}
                className="
                    bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:120%_.70em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_75%]
                                    "
              >
                {sub.name}
              </a>
              <span className="text-2xl">•</span>
            </>
          );
        })}
      </div>
    </div>
  );
}
