import { chatSession } from "@/configs/ai-model";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {prompt} = await req.json()
        console.log(prompt);

        const res = await chatSession.sendMessage(prompt);
        console.log(res.response.text);

        return NextResponse.json({
            'res' : JSON.parse(res.response.text())
        })

         
    } catch (error) {
        
        console.error(error);
        return NextResponse.error({
            status: 500,
            body: {
                error: error.message
            }
        })
    }
}