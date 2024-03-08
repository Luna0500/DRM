'use client'

import CreateListingForm from '@/app/ui/listings/createListingForm';
import { useSession } from "next-auth/react"

export default function Page() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
                <h1 className="text-5xl text-black">Create Listing</h1>
                <CreateListingForm />
            </main>
        );
    }
    else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
                <h1 className="text-5xl text-black">You Must Login to Create a Listing!</h1>
            </main>
        )
    }
}