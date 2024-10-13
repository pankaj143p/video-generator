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

import fs from 'fs';
import path from 'path';
import { GTTS } from 'gtts';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required for audio generation' });
    }

    // Create a unique filename for the audio file
    const fileName = `speech-${Date.now()}.mp3`;
    const filePath = path.join(process.cwd(), 'public', fileName);

    // Create a new GTTS instance
    const gtts = new GTTS(text, 'en');

    // Save the generated speech to a file
    gtts.save(filePath, (err) => {
      if (err) {
        console.error('Error saving audio file:', err);
        return res.status(500).json({ error: 'Failed to generate audio' });
      }

      // Send back the file path of the generated audio
      res.status(200).json({ filePath: `/${fileName}` });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
