'use client'

import CreateListingForm from '@/app/ui/listings/createListingForm';
import { useSession } from "next-auth/react"

export default function Page({
    searchParams,
}: {
    searchParams?: {
        IDQuery?: string;
    };
}) {
    const { data: session, status } = useSession()
    const IDQuery = searchParams?.IDQuery || '';
     
    if (status === "authenticated") {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-5xl text-black">Create Listing</h1>
                
                <CreateListingForm IDQuery={IDQuery} />
            </main>
        );
    }
    else {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-5xl text-black">You Must Login to Create a Listing!</h1>
            </main>
        )
    }  
    
}