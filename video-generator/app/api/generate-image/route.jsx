import Replicate from "replicate";
import { NextResponse } from "next/server";

export async function POST(req) {
try{
    const {prompt} = await req.json();
    const replicate = new Replicate({
    auth : process.env.RAPLICATE_API_TOKEN
});

const input = {
    prompt: prompt,
    heigth : 1280,
    width : 1024,
    num_outputs : 1
};

const output = await replicate.run("aleksa-codes/flux-ghibsky-illustration:a9f94946fa0377091ac0bcfe61b0d62ad9a85224e4b421b677d4747914b908c0", { input });
console.log(output)
return NextResponse.json({
    status: 200,
    'res': output[0]
})
}catch(err){
    return NextResponse.json({
        status: 500,
        error: err.message
    })
}
}


// export async function POST(req) {
//     try {
//         const { prompt } = await req.json();
//         console.log('Received prompt:', prompt);

//         const replicate = new Replicate({
//             auth: process.env.RAPLICATE_API_TOKEN
//         });

//         console.log('Replicate client initialized:', replicate);

//         const input = {
//             prompt: prompt,
//             height: 1280,   // Fixed typo: heigth -> height
//             width: 1024,
//             num_outputs: 1
//         };

//         console.log('Input for Replicate:', input);

//         const output = await replicate.run("aleksa-codes/flux-ghibsky-illustration:a9f94946fa0377091ac0bcfe61b0d62ad9a85224e4b421b677d4747914b908c0", { input });

//         console.log('Replicate output:', output);  // Log the output here

//         if (output && output.length > 0) {
//             return NextResponse.json({
//                 status: 200,
//                 res: output[0]
//             });
//         } else {
//             console.error('No output generated from Replicate');
//             return NextResponse.json({
//                 status: 500,
//                 message: 'No image generated'
//             });
//         }

//     } catch (err) {
//         console.error('Error in POST route:', err);
//         return NextResponse.json({
//             status: 500,
//             message: 'Internal Server Error',
//             error: err.message || 'No error message available',
//             stack: err.stack || 'No stack trace available'
//         });
//     }
// }
// import { OpenAI } from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
// });

// export async function POST(req) {
//   try {
//     // Parse the request body to get the prompt
//     const { prompt } = await req.json();

//     // Call OpenAI's image generation API
//     const response = await openai.images.generate({
//       prompt: prompt,
//       n: 1, // Number of images to generate
//       size: "1024x1024", // Specify the image size
//     });

//     // Return the generated image URL in the response
//     return NextResponse.json({
//       status: 200,
//       res: response.data[0].url, // Assuming the URL is in response.data[0].url
//     });
//   } catch (err) {
//     // Handle any errors
//     return NextResponse.json({
//       status: 500,
//       error: err.message,
//     });
//   }
// }
