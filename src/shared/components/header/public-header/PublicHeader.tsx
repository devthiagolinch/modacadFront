import { Link } from 'react-router-dom';

import telmaLogoDesk from '../../../../assets/svg/HOME logo TELMA BARCELLOS modacad.svg';
import telmaLogoDMobile from '../../../../assets/svg/MOBILE Logo TELMA BARCELLOS modacad.svg';
import { useState } from 'react';
import { DrawerLateral } from './DrawerLateral';
import { SearchDialog } from '../../search-dialog/SearchDialog';

export const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const toggleDialog = () => setIsOpenSearch((prev) => !prev);

  return (
    <div className="flex lg:items-center w-[100%] h-[90px] border-b-[1px] border-l-[1px] border-r-[1px] border-[#202020] bg-[#f1ece8] shadow-read">
      <div className="flex w-screen justify-between ">
        {/* Logo */}
        <div className="flex-1 justify-center items-center flex px-2">
          <Link to={'/'} className="h-[60px] lg:h-auto">
            <img src={telmaLogoDesk} className="hidden lg:block h-full" alt="Logo Desktop" />
            <img src={telmaLogoDMobile} className="block lg:hidden h-full" alt="Logo Mobile" />
          </Link>
        </div>
        {/* Menu */}
        <nav className="flex items-center">
          {/* {user ? (
            <Link
              to="/dashboard/texto"
              className="hidden lg:flex font-normal text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-5 py-7 tracking-[0.05em] bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%]"
            >
              Meu Perfil
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="hidden lg:flex font-normal border-l-2  lg:text-sm lg:border lg:border-r-0 lg:border-b-0 lg:border-t-0 lg:border-zinc-950 md:w-50 md:h-20 lg:px-5 lg:py-7 bg-gradient-to-t from-[#dcdf1e] to-[#dcdf1e] bg-[length:90%_2em] bg-no-repeat bg-[position:calc(90%_-_var(--p,0%))_900%]  hover:bg-[position:50%_73%] tracking-[0.05em]"
            >
              Fazer Login
            </Link>
          )} */}
          {/* <Link
            to="/planos"
            className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-6 pt-7 hover:bg-[#dcdf1e]"
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
          </Link> */}
          <button
            className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-[30px] hover:bg-[#dcdf1e]"
            onClick={toggleDialog}
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
          </button>
          <button
            className="font-medium text-sm border border-r-0 border-b-0 border-t-0 border-zinc-950 w-50 h-20 px-6 py-7 hover:bg-[#dcdf1e] block sm:hidden"
            onClick={toggleDrawer}
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
          </button>
        </nav>
      </div>
      <DrawerLateral isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <SearchDialog isOpen={isOpenSearch} toggleDialog={toggleDialog} />
    </div>
  );
};
