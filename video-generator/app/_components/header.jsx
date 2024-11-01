import React from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { UserButton } from '@clerk/nextjs';
import logo from '../../public/logo.svg';

const Header = () => {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50 bg-white'>
      <div className='flex flex-row gap-2 items-center'>
        <Image src={logo} width={40} height={40} alt='logo' />
        <h4 className='text-blue-800 font-bold text-2xl'>Video Generater</h4>
      </div>
      <div className='flex gap-3 items-center'>
        <Button className='bg-teal-700'>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* Add padding to the top using Tailwind to prevent content overlap */}
      <div className="pt-20"> 
        {children}
      </div>
    </>
  );
};

export default Layout;
