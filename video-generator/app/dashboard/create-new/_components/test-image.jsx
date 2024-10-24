'use client'
import { useState } from 'react';

export default function ImageTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  // Handle form submission (image upload)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('id', 'unique-image-id'); // Send a unique ID for the image

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadedUrl(`https://storage.googleapis.com/YOUR-FIREBASE-BUCKET/uploaded-images/unique-image-id.jpg`);
        setError(null);
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while uploading the file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Image to Firebase</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {uploadedUrl && (
        <div>
          <p>Image uploaded successfully! View it below:</p>
          <img src={uploadedUrl} alt="Uploaded" style={{ width: '300px', marginTop: '10px' }} />
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
