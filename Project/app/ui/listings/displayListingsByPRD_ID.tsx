'use client'

import '@/app/cardlist/homePage.css';
import { fetchListingsByPRD_ID, addToCart } from '@/app/lib/data';
import { Listing } from '@/app/ui/listings/listingInterfaces';
import { useSession } from "next-auth/react";

const handleAddToCart = async (LST_ID: number, userEmail: string) => {
    try {
        const CL_Email = userEmail;
        const CL_Quantity = 1;
        const cartItem = await addToCart(LST_ID, CL_Email, CL_Quantity);
        alert('Added to cart!');
    } catch (error) {
        alert('Failed to add to cart! Listing is likely already added!')
        console.error('Error adding to cart:', error);
    }
};

export default function ListingsByPRD_ID({ listingsData }: { listingsData: any }) {
    
    // Map the fetched data to the Listing interface
    const listings: Listing[] = listingsData.map((item: any) => ({
        LST_ID: item.lst_id,
        LST_UserEmail: item.lst_useremail,
        PRD_ID: item.prd_id,
        LST_Time: item.lst_time.toString(),
        LST_Status: item.lst_status,
        LST_Price: item.lst_price,
        LST_Quantity: item.lst_quantity,
        LST_Location: item.lst_location,
        LST_Condition: item.lst_condition,
        LST_ShipOption: item.lst_shipoption
    }));
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email || ''
    return (
        <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
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
                    {status === 'authenticated' && (
                        <>
                            <a href={"/updatelisting?IDQuery=" + LST_ID}>
                                <button className="edit-listing">Edit Listing</button>
                            </a>
                            <button onClick={() => handleAddToCart(LST_ID, userEmail)} className="add-to-cart">
                                Add to Cart
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
