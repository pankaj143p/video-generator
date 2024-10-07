'use client'
import React from 'react'
import {MenuData} from '@/Data/menudata'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const RightSideBar = () => {
    const path=usePathname();
    console.log(path);
  return (
    <div className='w-64 h-screen shadow-md p-5'>
      <div className='flex flex-col font-bold text-blue-900'>
        {MenuData.map((items) => (
            <Link href={items.link} >
          <div key={items.id} className={`cursor-pointer flex items-center p-3 space-x-2
           hover:bg-purple-600 hover:text-white rounded-md
            ${path==items.link&&'bg-purple-600 text-white'}`}>
            <items.icon/>
            <h1 className='text-xl'>{items.name}</h1>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default RightSideBar;
