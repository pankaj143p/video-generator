'use client'
import React, { useState, useEffect } from 'react';
import SelectTopic from './_components/select-topic';
import SelectStyle from './_components/selected-style';
import SelectDuration from './_components/select-duration';
import CustomLoading from './_components/custom-loading';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ImageTest from './_components/test-image';

const fileTempUrl = 'https://firebasestorage.googleapis.com/v0/b/video-generator-5a9a4.appspot.com/o/short-video-files%2F5f679536-4f9c-42e8-9f04-60b03837aff2.mp3?alt=media&token=1029423c-ef6e-4911-851e-71c552a81fff';

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [voices, setVoices] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [caption, setCaption] = useState();
  const [imageLists, setImageLists] = useState([]);

  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null); // State to store current uploaded image URL

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

  const onClickButtonHandler = async() => {
    if (currentImage) {
      handleImageUpload(currentImage); // Call handleImageUpload with the current image
    }
    getVideoScript();
    getAudioCaption(fileTempUrl);
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

      const id = uuidv4();
      await createAudioFile(res.data.res, id);
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAudioFile = async (videoScript, id) => {
    let script = videoScript.map(item => item.contentText).join(' ');

    console.log('Payload for audio file creation:', { text: script, id });

    try {
      const response = await axios.post('/api/get-audio-file', {
        text: script,
        id: id
      });

      if (response.status === 200) {
        console.log('Audio file created and saved:', response.data.filePath);
        setAudioFileUrl(response.data.filePath);
        response.data.filePath && getAudioCaption(res.data.filePath);
      } else {
        console.log('Failed to create audio file');
      }
    } catch (error) {
      console.error('Error creating audio file:', error);
    }
  };

  const getAudioCaption = async(filePath) => {
    setLoading(true);
    await axios.post('/api/get-caption-file', {
      audioFileUrl: filePath
    }).then((res) => {
      console.log(res.data.res);
      setCaption(res?.data?.res);
    });
    setLoading(false);
  };

  // Function to update uploaded images state
  const handleImageUpload = (url) => {
    setUploadedImages(prevImages => [...prevImages, url]);
  };

  // Function to handle image upload directly
  const handleImageSelect = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/image-from-user', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        const url = `https://storage.googleapis.com/YOUR-FIREBASE-BUCKET/uploaded-images/${file.name}`; // Adjust this as needed
        setCurrentImage(url);
        handleImageUpload(url); // Call handleImageUpload to store the image URL
      } else {
        console.error(result.message || 'Error uploading image');
      }
    } catch (err) {
      console.error('Error while uploading the file:', err);
    }
  };




  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        
        {/* Pass the handleImageSelect to ImageTest */}
        <ImageTest onImageSelect={handleImageSelect} />
        
        <div className='mt-10'>
          <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
        </div>
        <div className='mt-5 flex space-x-2'>
          <button onClick={tempHandle}>Start Speech</button>
          <button onClick={stopSpeech}>Stop Speech</button>
        </div>
      </div>
      <CustomLoading loading={loading} />
      
      {/* Display uploaded images */}
      <div className='mt-10'>
        <h3 className='text-xl font-bold'>Uploaded Images:</h3>
        <div className='flex flex-wrap'>
          {uploadedImages.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} className='w-32 h-32 object-cover m-2' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
