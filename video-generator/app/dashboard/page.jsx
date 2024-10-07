'use client'
import React from 'react'
import {Button} from '@/components/ui/button'
const Dashboard = () => {
  return (
    <div>
    
     <div className='flex items-center justify-between p-4'>
         <h1>Dashboard</h1>
         <Button className='bg-purple-950'>+Create New</Button>
     </div>
    </div>
  )
}

export default Dashboard
