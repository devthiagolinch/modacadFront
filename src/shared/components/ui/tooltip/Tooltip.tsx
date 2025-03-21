import React from 'react';

interface ITooltipProps {
  children?: React.ReactNode;
  label?: string;
}

export const Tooltip: React.FC<ITooltipProps> = ({ children, label }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-black border-transparent"></div>
      </div>
    </div>
  );
};
