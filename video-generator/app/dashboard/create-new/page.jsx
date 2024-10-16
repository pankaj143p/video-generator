


'use client'
import React, { useState, useEffect } from 'react';
import SelectTopic from './_components/select-topic';
import SelectStyle from './_components/selected-style';
import SelectDuration from './_components/select-duration';
import CustomLoading from './_components/custom-loading';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const fileTempUrl = 'https://firebasestorage.googleapis.com/v0/b/video-generator-5a9a4.appspot.com/o/short-video-files%2F5f679536-4f9c-42e8-9f04-60b03837aff2.mp3?alt=media&token=1029423c-ef6e-4911-851e-71c552a81fff'
const tempImages = [{
 
}]

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [voices, setVoices] = useState([]);
  const [audioFileUrl , setAudioFileUrl] = useState();
  const [caption, setCaption] = useState();
  const [imageLists , setImageLists] = useState();

  

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }, []);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onClickButtonHandler = () => {
    // getVideoScript();
    getAudioCaption(fileTempUrl)
  };

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
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    console.log("Speech stopped.");
  };

  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} with AI image prompt in ${formData.imagestyle} format for each scene and give me result in JSON format with imagePrompt and content Text as field`;
    
    try {
      const res = await axios.post('/api/get-video-script', { prompt });
      console.log(res.data.res);
      setVideoScript(res.data.res);

      // Generate a new ID and pass it to createAudioFile
      const id = uuidv4();
      await createAudioFile(res.data.res, id); // Pass both videoScript and id
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAudioFile = async (videoScript, id) => {
    let script = videoScript.map(item => item.contentText).join(' ');
    
    console.log('Payload for audio file creation:', { text: script, id }); // Log the payload

    try {
      const response = await axios.post('/api/get-audio-file', {
        text: script,
        id: id // Pass the id correctly
      });

      if (response.status === 200) {
        console.log('Audio file created and saved:', response.data.filePath);
        setAudioFileUrl(response.data.filePath)
        response.data.filePath&&getAudioCaption(res.data.filePath)
      } else {
        console.log('Failed to create audio file');
      }
    } catch (error) {
      console.error('Error creating audio file:', error);
    }
  };

  const getAudioCaption=async(filePath)=>{
    setLoading(true);

    await axios.post('/api/get-caption-file', {
      audioFileUrl: filePath
    }).then((res)=>{
      console.log(res.data.res);
      setCaption(res?.data?.res);
    })
    setLoading(false);
    
    console.log();
     
  }

  const getImages=async() =>{
      let images=[];
      videoScript.forEach(async(ele)=>{
        await axios.post('/api/generate-image',{
            prompt : ele?.imagePrompt
        }).then(resp=>{
          console.log(resp.data.res);
          images.push(resp.data.res);
        })
      })
      console.log(images);
      
      setImageLists(images);

      setLoading(false);
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <div className='mt-10'>
          <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
        </div>
        <div className='mt-5 flex space-x-2'>
          <button onClick={tempHandle}>Start Speech</button>
          <button onClick={stopSpeech}>Stop Speech</button>
        </div>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNew;
