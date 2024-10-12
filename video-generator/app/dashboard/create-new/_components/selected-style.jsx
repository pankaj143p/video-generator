import React, { useState } from 'react'
import { StypeOptions } from '@/Data/styleoptions'
import Image from 'next/image'

const SelectStyle = ({onUserSelect}) => {
    const [selected, setSelected] = useState();
    // const onHandleStyleChange=(styleName)=>{
    //     setSelected(styleName);
    // }
  return (
    <div className='mt-4'>
       <h2 className='font-bold text-xl text-blue-800'>Video Style</h2>
       <p className='text-gray-500'>select stype for your videos</p>
       <div className='grid grid-cols-2 md:grid-cols-3
            lg:grid-cols-5 xl:grid-cols-6 gap-5 m-3'>
        {StypeOptions.map((item,index)=>(
            <div key={index} className={`relative text-center hover:scale-110 transition-all cursor-pointer rounded-lg
            ${selected==item.name && 'border-4 border-blue-800 border-rounded-lg'} `}>
                <Image src={item.image} alt={item.name} width={100} height={100} className='w-full h-48 relative object-cover rounded-lg'
                    onClick={()=>{setSelected(item.name)
                    onUserSelect('imagestyle',item.name)
                    }}/>
                   
                    <h2 className='absolute text-center bg-black text-white p-1 bottom-0 w-full rounded-b-lg'>{item.name}</h2>
                </div>
        ))}
       </div>
    </div>
  )
}

export default SelectStyle
