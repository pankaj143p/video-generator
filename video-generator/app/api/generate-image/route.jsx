import Replicate from "replicate";

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

}

}