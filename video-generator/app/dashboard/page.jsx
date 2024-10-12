'use client'
import React, { useState } from 'react'
import {Button} from '@/components/ui/button'
import EmptyState from '@/app/_components/emptystate'
import Link from 'next/link'
function Dashboard(){
    const [videoList, setVideoList] = useState([]);
  return (
    <div className=''>
    
     <div className='flex items-center justify-between p-4'>
         <h1 className='text-2xl font-bold'>Dashboard</h1>

         <Link href={'dashboard/create-new'} >
         <Button className='bg-purple-950'>+Create New</Button>
         </Link>
     </div>
     {/* while there is no videos */}{
            videoList.length==0&&
             <div>
                <EmptyState></EmptyState>
             </div>
     }
    </div>
  )
}

export default Dashboard
