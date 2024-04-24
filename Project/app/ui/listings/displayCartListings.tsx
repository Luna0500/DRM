'use client'

import '@/app/cardlist/homePage.css';
import { removeFromCart, fetchCartListingsByCL_Email, fetchListingsByIDs } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { useSession } from "next-auth/react";
import { getServerSession } from 'next-auth';


const handleRemoveFromCart = async (LST_ID: number, userEmail: string) => {
    try {
        const CL_Email = userEmail;
        const cartItem = await removeFromCart(LST_ID, CL_Email);
        window.location.reload();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

export default function DisplayCartListings({ listings, userEmail }: { listings: Listing[]; userEmail: string }) {
    return (
        <div className="flex flex-wrap items-center justify-between">    
            {listings.map(({ LST_ID, PRD_ID, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption }) => (
                <div key={LST_ID} className="card h-[20rem] bg-white border border-black p-4 mb-8">
                    <p>Product ID: {PRD_ID}</p>
                    <p>Time: {LST_Time}</p>
                    <p>Status: {LST_Status}</p>
                    <p>Price: {LST_Price}</p>
                    <p>Quantity: {LST_Quantity}</p>
                    <p>Location: {LST_Location}</p>
                    <p>Condition: {LST_Condition}</p>
                    <p>Shipping Option: {LST_ShipOption}</p>
                    <button className="bg-red-700 hover:bg-red-800" onClick={() => handleRemoveFromCart(LST_ID, userEmail)}>
                        Remove From Cart
                    </button>
                </div>
            ))}
        </div>
    );
}
