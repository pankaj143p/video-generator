

'use client'
import React, { useState, useEffect } from 'react'
import SelectTopic from './_components/select-topic'
import SelectStyle from './_components/selected-style'
import SelectDuration from './_components/select-duration'
import CustomLoading from './_components/custom-loading'
import axios from 'axios'
// import { v4 as uuidv4 } from 'uuid';

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

    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.lang.includes('en'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    window.speechSynthesis.speak(utterance);
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); 
    console.log("Speech stopped.");
  }

  // Get video script 
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic: ' + formData.topic + ' with AI image prompt in ' + formData.imagestyle + ' format for each scene and give me result in JSON format with imagePrompt and content Text as field';
    const res = await axios.post('/api/get-video-script', { prompt: prompt }).then(resp => {
      console.log(resp.data.res);
      setVideoScript(resp.data.res);
      createAudioFile(resp.data.res);
    });
    setLoading(false);
  }

  // const createAudioFile=async(videoScript)=>{
  //   let script='';
   
  //   videoScript.forEach(item=>{
  //     script+=item.contentText;
  //   })
  //   // await axios.post('/api/get-audio-file',{
  //   //   text : script,
  //   //   id : id
  //   // }).then(resp=>{
  //   //   console.log(resp.data)
  //   // })
  //   // const res = axios.post('/api/get-audio-file', { text: text }).then(resp => {
  //   //   console.log(text);
  //   // });
  //   console.log(script);
    
  // }
  const createAudioFile = async (videoScript) => {
    let script = '';
  
    videoScript.forEach(item => {
      script += item.contentText + ' ';
    });
  
    try {
      const response = await axios.post('/api/get-audio-file', {
        text: script
      });
  
      if (response.status === 200) {
        console.log('Audio file created and saved:', response.data.filePath);
      } else {
        console.log('Failed to create audio file');
      }
    } catch (error) {
      console.error('Error creating audio file:', error);
    }
  };
  
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
