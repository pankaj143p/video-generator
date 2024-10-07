'use client'
import React from 'react'
import Link from 'next/link'

const EmptyState = () => {
  return (
    <div>
       <div className='bg-center mx-4 py-24 bg-slate-100 flex flex-col gap-3 items-center justify-center border-2 border-dash mt-10'>
                <h1 className='text-2xl font-bold text-gray-400'>No Videos Found</h1>
                <Link href='/dashboard/create-new'>
                <button className='bg-purple-950 rounded-md p-3 text-primary-foreground shadow hover:bg-primary/90' >Create New Videos</button>
                </Link>
            </div>
    </div>
  )
}

export default EmptyState
