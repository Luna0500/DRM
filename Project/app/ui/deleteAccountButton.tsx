'use client'

import '@/app/cardlist/homePage.css';
import { deleteUserData } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { useSession } from "next-auth/react";
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';


const handleDeleteAccount = async (userEmail: string, replace: any) => {
    try {
        await deleteUserData(userEmail);
        alert('All data that included your email has been deleted! You can go to GitHub to revoke your user token if needed.')
    } catch (error) {
        console.error('Error purchasing cart:', error);
    }
};

export default function DeleteAccountButton({ userEmail }: { userEmail: string }) {
    const { replace } = useRouter();
    return (
        <div className="flex flex-wrap items-center justify-between">
            <button className="deleteuser-button bg-red-700 hover:bg-red-800" onClick={() => handleDeleteAccount(userEmail, replace)}>
                DELETE USER DATA!
            </button>
        </div>
    );
}