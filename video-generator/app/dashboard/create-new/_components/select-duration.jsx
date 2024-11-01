'use client'

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select"
const SelectDuration = ({onUserSelect}) => {
  return (
    <div className='mt-10'>
    {/* Topic selection for generating video */}
    <h2 className='font-bold text-xl text-blue-800'>Video Duration</h2>
    <p className='text-gray-500'>What is the duration of your videos</p>
    <Select onValueChange={(value) => {
        onUserSelect('duration', value)
    }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Select topic for video"/>
        </SelectTrigger>
        <SelectContent>
          
                <SelectItem value='30 seconds'>
                    30 seconds
                    
                    
                </SelectItem>
                <SelectItem value='60 seconds'>
                    60 seconds

                    
                </SelectItem>
           
        </SelectContent>
    </Select>

   
</div>
  )
}

export default SelectDuration
