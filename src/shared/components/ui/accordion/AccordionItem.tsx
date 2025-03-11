import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface IAccordionItemProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({ title, children, open }) => {
  const [isOpen, setIsOpen] = useState(open || false);

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full flex justify-between items-center p-4 text-left transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </button>
      <div className={`transition-all overflow-hidden ${isOpen ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};
