'use client'
import { useState } from 'react';

export default function ImageTest({ onImageSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onImageSelect(file); // Call the onImageSelect directly
  };

  return (
    <div>
      <h1>Upload Image to Firebase</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
