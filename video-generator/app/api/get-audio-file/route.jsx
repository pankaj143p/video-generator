import { join } from 'path';
import fs from 'fs';
import gTTS from 'gtts';

export async function POST(req) {
  try {
    const { text } = await req.json(); // Get the text from the request body

    if (!text) {
      return new Response(JSON.stringify({ message: 'No text provided' }), { status: 400 });
    }

    // Generate speech from text
    const gttsInstance = new gTTS(text, 'en'); // Correct constructor usage
    const outputPath = join(process.cwd(), 'speech.mp3'); // Save the MP3 file in the root directory

    // Save the audio file
    return new Promise((resolve, reject) => {
      gttsInstance.save(outputPath, function (err) {
        if (err) {
          console.error('Error saving the audio file:', err);
          reject(new Response(JSON.stringify({ message: 'Failed to save audio file' }), { status: 500 }));
        } else {
          console.log('Audio file saved successfully at', outputPath);
          resolve(new Response(JSON.stringify({ message: 'Audio file created successfully', filePath: outputPath }), { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(JSON.stringify({ message: 'Failed to process request' }), { status: 500 });
  }
}
