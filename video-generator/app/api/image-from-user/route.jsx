import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../configs/firebaseConfig'; 
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export async function POST(req) {
    try {
        const formData = await req.formData();
        const image = formData.get('image');
        let id = formData.get('id');

        // Generate an ID if not provided
        if (!id) {
            id = uuidv4(); // Generate a random UUID if id isn't provided
        }

        // Check if the image file is present
        if (!image || !image.size) {
            return new Response(JSON.stringify({ message: 'No image provided' }), { status: 400 });
        }

        // Convert the image file to a buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Firebase
        const storageRef = ref(storage, `short-video-files/${id}.png`);
        await uploadBytes(storageRef, buffer, { contentType: image.type });

        return new Response(JSON.stringify({ message: 'Image uploaded successfully', id }), { status: 200 });
    } catch (error) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ message: 'Failed to process request' }), { status: 500 });
    }
}
