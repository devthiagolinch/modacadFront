import React from 'react';
import { Link } from 'react-router-dom';

interface IStyledBox {
  children: React.ReactNode;
  title: string;
  redirectTo?: string;
}

export const StyledBox: React.FC<IStyledBox> = ({ children, title, redirectTo }) => {
  return (
    <div className="flex border border-gray-800 mb-[-1px]">
      <div className="flex justify-start items-center border border-gray-800 -my-px">
        {redirectTo ? (
          <Link to={redirectTo}>
            <p className="transform -rotate-90 text-2xl text-nowrap font-light text-gray-700">{title}</p>
          </Link>
        ) : (
          <p className="transform -rotate-90 text-2xl text-nowrap font-light text-gray-700">{title}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};
