
import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req){
try{
const {audioFileUrl} = await req.json();
const client = new AssemblyAI({
  apiKey: process.env.ASSEBLY_API_KEY,
});

const FILE_URL = audioFileUrl

const data = {
  audio: FILE_URL
}


  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.words);
    return NextResponse.json({
        status: 200,
        transcript: transcript.words
    })
}
catch(err){
    return NextResponse.json({
        status: 500,
        error: err.message
    })
   
}

}