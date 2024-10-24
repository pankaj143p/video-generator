import { ref, uploadBytes } from 'firebase/storage';
import fs from 'fs';
import { storage } from '@/configs/firebaseConfig'; 
import { join } from 'path';
import multer from 'multer';

const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()); // Save the file in the current working directory temporarily
  },
  filename: function (req, file, cb) {
    cb(null, `temp-image-${Date.now()}.jpg`); // Generate a unique filename
  }
});

const upload = multer({ storage: storageEngine });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to handle multipart form data
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, {}, async (err) => {
      if (err) {
        console.error('Error in file upload:', err);
        return reject(new Response(JSON.stringify({ message: 'Failed to upload file' }), { status: 500 }));
      }

      const { id } = req.body; // Assuming 'id' is provided in the form data

      if (!id) {
        return resolve(new Response(JSON.stringify({ message: 'No ID provided' }), { status: 400 }));
      }

      const tempImagePath = join(process.cwd(), req.file.filename); // Temporary image path

      try {
        const imageFile = fs.readFileSync(tempImagePath); // Read the temporary file
        const stoRef = ref(storage, `short-video-files/${id}.jpg`); // Firebase Storage reference

        // Upload the image to Firebase Storage
        await uploadBytes(stoRef, imageFile);
        console.log('Image uploaded successfully to Firebase Storage at', `uploaded-images/${id}.jpg`);

        // Respond with success
        resolve(new Response(JSON.stringify({ message: 'Image uploaded successfully' }), { status: 200 }));
      } catch (uploadError) {
        console.error('Error uploading image to Firebase:', uploadError);
        reject(new Response(JSON.stringify({ message: 'Failed to upload image to Firebase' }), { status: 500 }));
      } finally {
        // Delete the temporary file
        fs.unlinkSync(tempImagePath);
      }
    });
  });
}
