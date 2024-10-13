// 'use client'
// import React, { useState } from 'react'
// import SelectTopic from './_components/select-topic'
// import SelectStyle from './_components/selected-style'
// import SelectDuration from './_components/select-duration'
// import CustomLoading from './_components/custom-loading'
// import Button from '@/components/ui/button'
// import axios from 'axios'

// const CreateNew = () => {

//   const [formData, setFormData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [videoScript, setVideoScript] = useState();
//   const onHandleInputChange=(fieldName, fieldValue)=>{
//      console.log(fieldName,fieldValue);
//      setFormData(prev=>({
//         ...prev,
//         [fieldName]:fieldValue
//      }))
//   }
//   const onClickButtonHandler=()=>{
//     getVideoScript();
//   }
//   const stopSpeech = () => {
//     window.speechSynthesis.cancel(); // Stop the speech
//     console.log("Speech stopped.");
//   }

//   // const tempHandle=()=>{
//   //   const text=videoScript;
//   //   const value=new SpeechSynthesisUtterance(text);
//   //   window.speechSynthesis.speak(value);
//   //   console.log(text);
    

//   // }
//   const tempHandle = () => {
//     if (!videoScript || videoScript.length === 0) {
//       console.log("No video script available");
//       return;
//     }
  
//     // Extract all contentText values from videoScript array
//     const text = videoScript
//       .map(scene => scene.contentText) // extract contentText from each object
//       .join(' '); // join them into a single string with a space separator
  
//     const value = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(value);
//     console.log(text);
//   };
  
//   // get video script 
  
//  const getVideoScript = async () => {
//   setLoading(true);
//   const prompt = 'Write a script to generate ' + formData.duration + ' video on topic: ' + formData.topic + ' with AI image prompt in ' + formData.imagestyle + ' format for each scene and give me result in JSON format with imagePrompt and content Text as field';
//   const res = await axios.post('/api/get-video-script', { prompt : prompt }).then(resp=>{
//     console.log(resp.data.res);
//     setVideoScript(resp.data.res);
//   });
//   // console.log(prompt);
//   setLoading(false);
//  }
//   return (
//     <div className='md:px-20' >

//      <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
//      <div className='mt-10 shadow-md p-10'>
     
//       {/*  topics selection  */}
      
//       <SelectTopic onUserSelect={onHandleInputChange} ></SelectTopic>
      
//       {/*  styles for selection */} 
//       <SelectStyle onUserSelect={onHandleInputChange}></SelectStyle>

//       {/* video duration  */}
//       <SelectDuration onUserSelect={onHandleInputChange}></SelectDuration>

//       {/* create button for videos */}
//       <div className='mt-10'>
//         <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
//       </div>
//      <button onClick={tempHandle}>Temp Speech</button>
//      <button onClick={stopSpeech}>stop Speech</button>
//      </div>
//        <CustomLoading loading={loading}></CustomLoading>
//     </div>
//   )
// }

// export default CreateNew

'use client'
import React, { useState, useEffect } from 'react'
import SelectTopic from './_components/select-topic'
import SelectStyle from './_components/selected-style'
import SelectDuration from './_components/select-duration'
import CustomLoading from './_components/custom-loading'
import Button from '@/components/ui/button'
import axios from 'axios'

const CreateNew = () => {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Get available voices when the component mounts
    const populateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
    };

    // Populate voices on component load
    populateVoices();

    // Event listener to repopulate voices when they change (e.g., on Safari)
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }, []);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onClickButtonHandler = () => {
    getVideoScript();
  }

  // Handle speech synthesis start and stop
  const tempHandle = () => {
    if (!videoScript || videoScript.length === 0) {
      console.log("No video script available");
      return;
    }

    const text = videoScript.map(scene => scene.contentText).join(' ');
    const utterance = new SpeechSynthesisUtterance(text);

    // Find a female voice (based on language or gender)
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.lang.includes('en'));

    // Set the voice if found
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Start speech synthesis
    window.speechSynthesis.speak(utterance);
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stop the speech
    console.log("Speech stopped.");
  }

  // Get video script 
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic: ' + formData.topic + ' with AI image prompt in ' + formData.imagestyle + ' format for each scene and give me result in JSON format with imagePrompt and content Text as field';
    const res = await axios.post('/api/get-video-script', { prompt: prompt }).then(resp => {
      console.log(resp.data.res);
      setVideoScript(resp.data.res);
    });
    setLoading(false);
  }

  return (
    <div className='md:px-20' >

      <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>

        {/*  topics selection  */}
        <SelectTopic onUserSelect={onHandleInputChange}></SelectTopic>

        {/*  styles for selection */}
        <SelectStyle onUserSelect={onHandleInputChange}></SelectStyle>

        {/* video duration  */}
        <SelectDuration onUserSelect={onHandleInputChange}></SelectDuration>

        {/* create button for videos */}
        <div className='mt-10'>
          <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
        </div>

        {/* Buttons for speech control */}
        <div className='mt-5 flex space-x-2'>
          <button onClick={tempHandle}>Start Speech</button>
          <button onClick={stopSpeech}>Stop Speech</button>
        </div>

      </div>

      <CustomLoading loading={loading}></CustomLoading>
    </div>
  )
}

export default CreateNew
