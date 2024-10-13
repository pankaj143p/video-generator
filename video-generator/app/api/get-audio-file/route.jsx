// import fs from 'fs';
// import path from 'path';
// import { exec } from 'child_process';

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const { text } = req.body;
//     const fileName = `speech-${Date.now()}.mp3`;
//     const filePath = path.join(process.cwd(), 'public', fileName);

//     // Use say command to generate the audio file (for Linux/Mac, adjust for Windows if needed)
//     exec(`say -o ${filePath} --data-format=mp3 "${text}"`, (err) => {
//       if (err) {
//         console.error('Error generating audio:', err);
//         res.status(500).json({ error: 'Failed to generate audio' });
//         return;
//       }

//       // Send back the file path of the generated audio
//       res.status(200).json({ filePath: `/${fileName}` });
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import fs from 'fs';
// import path from 'path';
// import { GTTS } from 'gtts';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: 'Text is required for audio generation' });
//     }

//     // Create a unique filename for the audio file
//     const fileName = `speech-${Date.now()}.mp3`;
//     const filePath = path.join(process.cwd(), 'public', fileName);

//     // Create a new GTTS instance
//     const gtts = new GTTS(text, 'en');

//     // Save the generated speech to a file
//     gtts.save(filePath, (err) => {
//       if (err) {
//         console.error('Error saving audio file:', err);
//         return res.status(500).json({ error: 'Failed to generate audio' });
//       }

//       // Send back the file path of the generated audio
//       res.status(200).json({ filePath: `/${fileName}` });
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// import textToSpeech from '@google-cloud/text-to-speech';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';
// import { Result } from 'postcss';
// const client = new textToSpeech.TextToSpeechClient({
//     apiKey : process.env.GOOGLE_API_KEY,
// });
// const fs = require('fs');
// const util = require('util');

// export async function POST(req){
//     const { text, id } = req.json();
//     const request = {
//         input: {text: text},
//         voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
//         audioConfig: {audioEncoding: 'MP3'},
//       };


//       const [response] = await client.synthesizeSpeech(request);
//   // Write the binary audio content to a local file
//   const writeFile = util.promisify(fs.writeFile);
//   await writeFile('output.mp3', response.audioContent, 'binary');
//   console.log('Audio content written to file: output.mp3');

//   return NextResponse.json({Result : 'Success'});
// }




import * as PlayHT from 'playht';
import fs from 'fs';
import path from 'path';

PlayHT.init({
  userId: process.env.PLAYHT_USER_ID,  // Use your PlayHT user ID
  apiKey: process.env.PLAYHT_API_KEY,  // Use your PlayHT API key
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const filePath = path.resolve('public', 'output.mp3'); // Path to save audio file
      const stream = await PlayHT.stream(text, { voiceEngine: 'Play3.0-mini' });
      stream.on('data', (chunk) => {
        fs.appendFileSync(filePath, chunk);
      });

      stream.on('end', () => {
        res.status(200).json({ filePath: '/output.mp3' });
      });
    } catch (error) {
      console.error('Error generating audio:', error);
      res.status(500).json({ error: 'Audio generation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
