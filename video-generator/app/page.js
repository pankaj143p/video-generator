import Image from "next/image";
import { Button } from "../components/ui/button";
import { SignIn , UserButton} from "@clerk/nextjs";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
   <>
    <div className='text-red-300' >
      <h1>Video Generator</h1>
     {/* <SignIn></SignIn> */}
     {/* <Dashboard></Dashboard> */}
     <UserButton/>
    </div>
   </>
  );
}
