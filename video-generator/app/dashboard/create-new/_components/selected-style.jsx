import React from 'react'
import { StypeOptions } from '@/Data/styleoptions'

const SelectStyle = () => {
  return (
    <div className='mt-4'>
       <h2 className='font-bold text-xl text-blue-800'>Video Style</h2>
       <p className='text-gray-500'>select stype for your videos</p>
       <div className='grid grid-cols-2 md:grid-cols-3
            lg:grid-cols-5 xl:grid-cols-6 gap-5'>
        {StypeOptions.map((item,index)=>(
            <div key={index} className=''>
                <img src={item.image} alt={item.name} className='w-full h-40 object-cover'/>
                    <p className='text-center'>{item.name}</p>
                </div>
        ))}
       </div>
    </div>
  )
}

export default SelectStyle
