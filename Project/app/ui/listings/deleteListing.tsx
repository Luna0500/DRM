'use client'

import '@/app/cardlist/homePage.css';
import { deleteListing } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Listing } from '@/app/ui/listings/listingInterfaces';

const DeleteListing = ({ listing }: { listing: Listing }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const userEmail = session?.user?.email

    const handleDelete = async () => {
        await deleteListing(listing.LST_ID);
        router.push('/cardlist');
    };
    <h1 className="text-5xl text-black">Hello</h1>
    if (!session || listing.LST_UserEmail !== userEmail) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
                <h1 className="text-5xl text-black">You Must Login to Delete a Listing!</h1>
            </main>
        );
    } else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
                <h1 className="text-5xl text-black">Are you sure you want to delete the listing?</h1>
                <button className="delete-listing" onClick={handleDelete}>Delete Listing</button>
            </main>
        );
    }
};

export default DeleteListing;