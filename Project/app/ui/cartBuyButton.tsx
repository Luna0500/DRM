'use client'

import '@/app/cardlist/homePage.css';
import { createOHListings } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { useSession } from "next-auth/react";
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';


const handleBuyCart = async (listings: Listing[], buyerEmail: string, replace: any) => {
    try {
        await createOHListings(listings, buyerEmail);
        replace(`orderhistory/`);
    } catch (error) {
        console.error('Error purchasing cart:', error);
    }
};

export default function CartBuyButton({ listings, userEmail }: { listings: Listing[]; userEmail: string }) {
    const { replace } = useRouter();
    return (
        <div className="flex flex-wrap items-center justify-between p-24">
            <button className="topbar-buttons bg-green-700 hover:bg-green-800" onClick={() => handleBuyCart(listings, userEmail, replace)}>
                Checkout
            </button>
        </div>
    );
}