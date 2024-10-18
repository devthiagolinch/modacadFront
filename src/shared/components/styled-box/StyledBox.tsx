import React from 'react';
import { Link } from 'react-router-dom';

interface IStyledBox {
  children: React.ReactNode;
  title: string;
  redirectTo?: string;
}

export const StyledBox: React.FC<IStyledBox> = ({ children, title, redirectTo }) => {
  return (
    <div className="flex lg:justify-between border-[1px] border-[#202020] -mb-[1px] min-h-[300px]">
      <div className="flex justify-start items-center border-[1px] px-[8.3px] pt-16 border-[#202020] -mr-[1px] -mt-[1px] -mb-[1px] align-middle">
        {redirectTo ? (
          <Link to={redirectTo}>
            <p className="transform: -rotate-90 lg:w-[22px] text-nowrap">{title}</p>
          </Link>
        ) : (
          <p className="transform: -rotate-90 lg:w-[22px] text-nowrap">{title}</p>
        )}
      </div>
      <div className="font-butler_ultra_light lg:text-[40px] leading-[60px] w-full flex flex-wrap items-center align-middle p-[60px] gap-4">
        {children}
      </div>
    </div>
  );
};
