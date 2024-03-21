import Image from 'next/image';
import fs from 'fs';
import Search from '@/app/ui/search';
import { fetchCardsByName } from '@/app/lib/data';
import CardDetail from '@/app/ui/carddetail/carddetails';
import ListingsByPRD_ID from '@/app/ui/listings/displayListingsByPRD_ID';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        IDQuery?: string;
    };
}) {
    const IDQuery = searchParams?.IDQuery || '';
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Card Details</h1>
            <CardDetail IDQuery={IDQuery} />
            <div className="mt-8 flex flex-col items-center"> 
                <h2 className="text-5xl text-black mb-4">Listings</h2> 
                <ListingsByPRD_ID IDQuery={IDQuery} />
            </div>
        </main>
    );
}