import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import logo from '@/public/logo.svg';

const Header = () => {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <div className='flex flex-row gap-2 items-center'>
        <Image src={logo} width={40} height={40}></Image>
        <h4 className='text-blue-800 font-bold text-2xl '>Video Generater</h4>
      </div>
      <div className='flex gap-3 items-center'>
        <Button className='bg-teal-700'>Dashboard</Button>
        <UserButton></UserButton>
      </div>
    </div>
  );
}

export default Header;
