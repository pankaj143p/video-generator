// // import { join } from 'path';
// // import fs from 'fs';
// // import gTTS from 'gtts';
// // import { ref, uploadBytes } from 'firebase/storage';


// // export async function POST(req) {
// //   try {
// //     const { text,id } = await req.json(); // Get the text from the request body
// //     const stoRef = ref(storage, 'short-video-files/'+id+'.mp3');

// //     if (!text) {
// //       return new Response(JSON.stringify({ message: 'No text provided' }), { status: 400 });
// //     }

// //     // Generate speech from text
// //     const gttsInstance = new gTTS(text, 'en'); // Correct constructor usage
// //     const outputPath = join(process.cwd(), 'speech.mp3'); // Save the MP3 file in the root directory

    


import { ref, uploadBytes } from 'firebase/storage';
import gTTS from 'gtts';
import fs from 'fs';
import { storage } from '../../../configs/firebaseConfig'; 
import { join } from 'path'; 

export async function POST(req) {
    try {
       
        const { text, id } = await req.json();

        console.log('Received text:', text);
        console.log('Received id:', id);

        // Check if text and id are provided
        if (!text || !id) {
            console.error('Missing text or ID'); // Log detailed error
            return new Response(JSON.stringify({ message: 'No text or ID provided' }), { status: 400 });
        }
        const gttsInstance = new gTTS(text, 'en'); // Create a new gTTS instance
        const outputPath = join(process.cwd(), 'speech.mp3'); // Save the MP3 file temporarily

        // Save the audio file
        return new Promise((resolve, reject) => {
            gttsInstance.save(outputPath, async function (err) {
                if (err) {
                    console.error('Error saving the audio file:', err);
                    reject(new Response(JSON.stringify({ message: 'Failed to save audio file' }), { status: 500 }));
                } else {
                    console.log('Audio file saved successfully at', outputPath);

                    // Upload the audio file to Firebase Storage
                    const audioFile = fs.readFileSync(outputPath); // Read the file contents
                    const stoRef = ref(storage, `short-video-files/${id}.mp3`); // Reference to Firebase Storage

                    try {
                        await uploadBytes(stoRef, audioFile); // Upload the file
                        console.log('Audio file uploaded successfully to Firebase Storage at', `short-video-files/${id}.mp3`);
                        resolve(new Response(JSON.stringify({ message: 'Audio file created and uploaded successfully' }), { status: 200 }));
                    } catch (uploadError) {
                        console.error('Error uploading audio file to Firebase:', uploadError);
                        reject(new Response(JSON.stringify({ message: 'Failed to upload audio file to Firebase' }), { status: 500 }));
                    } finally {
                        // Optionally delete the temporary file after upload
                        fs.unlinkSync(outputPath);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ message: 'Failed to process request' }), { status: 500 });
    }
}
