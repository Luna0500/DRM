import Image from 'next/image';
import fs from 'fs';
import Search from '@/app/ui/search';
import { fetchListingsByPRD_ID } from '@/app/lib/data';
import CardDetail from '@/app/ui/carddetail/carddetails';
import ListingsByPRD_ID from '@/app/ui/listings/displayListingsByPRD_ID';
import '@/app/cardlist/homePage.css';


export default async function Page({
    searchParams,
}: {
    searchParams?: {
        IDQuery?: string;
    };
}) {
    const IDQuery = searchParams?.IDQuery || '';
    const listingsData: any[] = await fetchListingsByPRD_ID(IDQuery);
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">Card Details</h1>
            <CardDetail IDQuery={IDQuery} />
            <div className="mt-8 flex flex-col items-center"> 
                <h2 className="text-5xl text-black mb-4">Listings</h2>
                <a href={"/createlisting?IDQuery=" + IDQuery}>
                    <button className="topbar-buttons hover:bg-green-600">
                        Create Listing!
                    </button>
                </a>
                <ListingsByPRD_ID listingsData={listingsData} />
            </div>
        </main>
    );
}