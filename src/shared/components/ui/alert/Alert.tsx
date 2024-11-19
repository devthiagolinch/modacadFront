import React from 'react';

interface IAlertProps {
  color: 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  message: string;
  title?: string;
}

const colorClasses = {
  secondary: 'bg-gray-500 text-white',
  success: 'bg-teal-500 text-white',
  danger: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-600 text-white',
  light: 'bg-white text-black',
  dark: 'bg-gray-800 text-white',
};

export const Alert: React.FC<IAlertProps> = ({ color, message, title }) => {
  return (
    <div
      className={`mt-2 text-sm rounded-lg p-4 ${colorClasses[color]}`}
      role="alert"
      tabIndex={-1}
      aria-labelledby={`hs-solid-color-${color}-label`}
    >
      {title ? (
        <span id={`hs-solid-color-${color}-label`} className="font-bold">
          {title}
        </span>
      ) : null}
      <p>{message}</p>
    </div>
  );
};
