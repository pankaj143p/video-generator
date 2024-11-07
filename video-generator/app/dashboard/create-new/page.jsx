'use client'
import React, { useState, useEffect, useContext } from 'react';
import SelectTopic from './_components/select-topic';
import SelectStyle from './_components/selected-style';
import SelectDuration from './_components/select-duration';
import CustomLoading from './_components/custom-loading';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ImageTest from './_components/test-image';
import { VideoDataContext } from '../../context/video-data-context';
import { useUser } from '@clerk/nextjs';
import { VideoData } from '../../../configs/schema';
import { db } from '../../../configs/db';

const fileTempUrl = 'https://firebasestorage.googleapis.com/v0/b/video-generator-5a9a4.appspot.com/o/short-video-files%2F5f679536-4f9c-42e8-9f04-60b03837aff2.mp3?alt=media&token=1029423c-ef6e-4911-851e-71c552a81fff';

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [voices, setVoices] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const user = useUser();

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

  const onClickButtonHandler = async () => {
    if (currentImage) handleImageUpload(currentImage);
    await getVideoScript();
  };

  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} with AI image prompt in ${formData.imagestyle} format for each scene and give me result in JSON format with imagePrompt and content Text as field`;

    try {
      const res = await axios.post('/api/get-video-script', { prompt });
      console.log("Video Script Response:", res.data.res);
      setVideoScript(res.data.res);
      setVideoData(prev => ({
        ...prev,
        videoScript: res.data.res,
      }));
      
      const id = uuidv4();
      await createAudioFile(res.data.res, id);
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAudioFile = async (videoScript, id) => {
    const script = videoScript.map(item => item.contentText).join(' ');

    try {
      const response = await axios.post('/api/get-audio-file', {
        text: script,
        id: id
      });

      if (response.status === 200) {
        console.log('Audio file created and saved:', response.data.filePath);
        setAudioFileUrl(response.data.filePath);
        await getAudioCaption(response.data.filePath, videoScript);
      } else {
        console.log('Failed to create audio file');
      }
    } catch (error) {
      console.error('Error creating audio file:', error);
    }
  };

  const getAudioCaption = async (filePath, videoScript) => {
    setLoading(true);

    try {
      const res = await axios.post('/api/get-caption-file', { audioFileUrl: filePath });
      console.log('Caption File Path:', res.data.filePath);
      setCaption(res.data.filePath);
      setVideoData(prev => ({
        ...prev,
        caption: res.data.filePath,
        audioFileUrl: filePath,
      }));
    } catch (error) {
      console.error("Error fetching caption:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url) => {
    setVideoData(prev => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), url],
    }));
    setUploadedImages(prevImages => [...prevImages, url]);
  };

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
        const url = `https://storage.googleapis.com/YOUR-FIREBASE-BUCKET/uploaded-images/${file.name}`;
        setCurrentImage(url);
        handleImageUpload(url);
      } else {
        console.error(result.message || 'Error uploading image');
      }
    } catch (err) {
      console.error('Error while uploading the file:', err);
    }
  };

  useEffect(() => {
    console.log('Updated videoData:', videoData);
    if (Object.keys(videoData).length > 0) {
      saveVideoData(videoData);
    }
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setLoading(true);
    try {
      const res = await db.insert(VideoData).values({
        script: videoData.videoScript,
        audioFileUrl: videoData.audioFileUrl,
        caption: videoData.caption,
        imageUrls: videoData.imageUrls,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      }).returning({ id: VideoData.id });
      console.log('Database insertion result:', res);
    } catch (error) {
      console.error('Error inserting data into the database:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-blue-800 text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <ImageTest onImageSelect={handleImageSelect} />
        
        <div className='mt-10'>
          <button className='bg-teal-700 hover:bg-slate-900 text-white p-3 rounded-lg w-full' onClick={onClickButtonHandler}>Create New Video</button>
        </div>
      </div>
      <CustomLoading loading={loading} />

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
