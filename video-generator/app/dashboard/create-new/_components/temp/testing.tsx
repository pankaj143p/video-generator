// 'use client';
// import React, { useState } from 'react';



// const MainComponent = () => {
//   const [imageLists, setImageLists] = useState([]);

//   const handleUploadSuccess = (url) => {
//     setImageLists(prev => [...prev, url]); // Update the image list state
//   };

//   // Example of the getImages function
//   const getImages = async () => {
//     // Assume tempImages is defined elsewhere
//     const tempImages = [ /* your temp image data */ ];
    
//     setLoading(true);
//     const images = await Promise.all(tempImages.map(async (ele) => {
//       try {
//         const resp = await axios.post('/api/generate-image', {
//           prompt: ele?.imagePrompt
//         });
//         return resp.data.res || resp.data.data?.url; 
//       } catch (error) {
//         console.error('Error fetching image:', error);
//         return null;
//       }
//     }));

//     setImageLists(images.filter(image => image !== null));
//     setLoading(false);
//   };

//   return (
//     <div>
//       <ImageTest onUploadSuccess={handleUploadSuccess} />
//       {/* You can also display uploaded images here */}
//       {imageLists.length > 0 && (
//         <div>
//           <h2>Uploaded Images:</h2>
//           {imageLists.map((url, index) => (
//             <img key={index} src={url} alt={`Uploaded ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
//           ))}
//         </div>
//       )}
//       <button onClick={getImages}>Generate Images</button>
//     </div>
//   );
// };

// export default MainComponent;
