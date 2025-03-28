import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IMySectionProps {
  children?: ReactNode;
  title?: string;
  titleLink?: string;
  featuredTitle?: boolean;
  invisibleBottomBorder?: boolean;
  disableInternalPadding?: boolean;
  featuredSection?: boolean;
}
export const MySection: FC<IMySectionProps> = ({
  children,
  title,
  titleLink,
  featuredTitle,
  invisibleBottomBorder,
  disableInternalPadding,
  featuredSection,
}) => {
  const renderTitle = (title: string) => (
    <div className="flex items-center justify-center h-full">
      <h3 className="-rotate-90 text-2xl text-nowrap font-light text-gray-700">{title.toUpperCase()}</h3>
    </div>
  );

  return (
    <section
      className={
        'border border-gray-800 grid grid-cols-12' +
        (invisibleBottomBorder ? ' border-b-0' : '') +
        (featuredSection ? ' shadow-read' : '')
      }
    >
      {title ? (
        <div
          className={`col-span-2 md:col-span-1 flex flex-col justify-center ${featuredTitle ? 'border-r border-gray-800' : ''} overflow-hidden`}
        >
          {titleLink ? <Link to={titleLink}>{renderTitle(title)}</Link> : renderTitle(title)}
        </div>
      ) : null}
      <div
        className={`${title ? 'col-span-10 md:col-span-11' : 'col-span-12'} ${!disableInternalPadding ? 'px-4 py-8' : ''}`}
      >
        {children}
      </div>
    </section>
  );
};
