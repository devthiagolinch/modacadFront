import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';

interface IDropdownMenuProps {
  textButton: string;
  items: {
    name: string;
    key: string;
  }[];
  onSelect: (key: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenuProps> = ({ textButton, items, onSelect }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className="px-4 py-2 bg-gray-950 text-white">{textButton}</MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {items.map((item, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <button
                    onClick={() => onSelect(item.key)}
                    className={`${active ? 'bg-bgBtn text-white' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700`}
                  >
                    {item.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};
