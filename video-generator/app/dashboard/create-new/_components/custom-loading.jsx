import React from 'react'
import Image from 'next/image'
import {
    AlertDialog,
    AlertDialogContent,
    
} from "@/components/ui/alert-dialog"

function LoadingEffect({loading}) {
    return (
        <div>
            <AlertDialog open={loading} >
                <AlertDialogContent>
                    <div className='flex flex-col items-center'>
                        <Image alt='loading' src={'/loading.gif'} width={100} height={100}></Image>
                        <h1 className='text-md font-bold'>Generating your video... Please don't refresh the page</h1>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LoadingEffect;
