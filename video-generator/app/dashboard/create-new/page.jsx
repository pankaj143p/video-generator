'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/select-topic'
import SelectStyle from './_components/selected-style'
import SelectDuration from './_components/select-duration'

const CreateNew = () => {

  const [formData, setFormData] = useState([]);
  const onHandleInputChange=(fieldName, fieldValue)=>{
     console.log(fieldName,fieldValue);
     

  }
  return (
    <div className='md:px-20' >

     <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
     <div className='mt-10 shadow-md p-10'>
      {/*  topics selection  */}
      <SelectTopic onUserSelect={onHandleInputChange} ></SelectTopic>
      
      {/*  styles for selection */} 
      <SelectStyle onUserSelect={onHandleInputChange}></SelectStyle>

      {/* video duration  */}
      <SelectDuration onUserSelect={onHandleInputChange}></SelectDuration>
      {/* create button for videos */}
     </div>
    </div>
  )
}

export default CreateNew
