'use client'

import '@/app/cardlist/homePage.css';
import { removeFromCart, fetchCartListingsByCL_Email, fetchListingsByIDs } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { useSession } from "next-auth/react";
import { getServerSession } from 'next-auth';


export default function DisplayOHListings({ listings }: { listings: Listing[]; }) {
    return (
        <div className="flex min-h-screen flex-wrap items-center justify-between p-24">    
            {listings.map(({ LST_ID, PRD_ID, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption }) => (
                <div key={LST_ID} className="card h-[20rem] bg-[#eafae1] border border-black p-4 mb-8">
                    <p>Product ID: {PRD_ID}</p>
                    <p>Time: {LST_Time}</p>
                    <p>Status: {LST_Status}</p>
                    <p>Price: {LST_Price}</p>
                    <p>Quantity: {LST_Quantity}</p>
                    <p>Location: {LST_Location}</p>
                    <p>Condition: {LST_Condition}</p>
                    <p>Shipping Option: {LST_ShipOption}</p>
                </div>
            ))}
        </div>
    );
}
