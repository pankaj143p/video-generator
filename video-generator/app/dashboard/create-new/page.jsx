'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/select-topic'
import SelectStyle from './_components/selected-style'
import SelectDuration from './_components/select-duration'
import axios from 'axios'

const CreateNew = () => {

  const [formData, setFormData] = useState([]);
  const onHandleInputChange=(fieldName, fieldValue)=>{
     console.log(fieldName,fieldValue);
     setFormData(prev=>({
        ...prev,
        [fieldName]:fieldValue
     }))
  }
  const onClickButtonHandler=()=>{
    getVideoScript();
  }
  // get video script 
  
 const getVideoScript = async () => {
  const prompt = 'Write a script to generate ' + formData.duration + ' video on topic: ' + formData.topic + ' with AI image prompt in ' + formData.imagestyle + ' format for each scene and give me result in JSON format with imagePrompt and content Text as field';
  const res = await axios.post('/api/get-video-script', { prompt : prompt }).then(resp=>{
    console.log(resp.data);
  });
  console.log(prompt);
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
      <div className='mt-10'>
        <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
        </div>

     </div>
    </div>
  )
}

export default CreateNew
