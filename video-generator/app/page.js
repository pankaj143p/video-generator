import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <>
    <div className='text-red-300' >
      <h1>Video Generator</h1>
      <Button variant="destructive">Hello Design</Button>
      <UserButton></UserButton>
    </div>
   </>
  );
}
