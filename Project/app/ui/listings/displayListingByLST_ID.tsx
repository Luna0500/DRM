import '@/app/cardlist/homePage.css';
import { fetchListingByLST_ID } from '@/app/lib/data';
import { Listing } from '@/app/ui/listings/listingInterface'

export default async function ListingByLST_ID({ IDQuery }: { IDQuery: number; }) {
    // Fetch initial listings data
    const listingsData: any[] = await fetchListingByLST_ID(IDQuery);
    // Map the fetched data to the Listing interface
    const listingMap: Listing[] = listingsData.map((item: any) => ({
        LST_ID: item.lst_id,
        PRD_ID: item.prd_id,
        LST_Time: item.lst_time.toString(),
        LST_Status: item.lst_status,
        LST_Price: item.lst_price,
        LST_Quantity: item.lst_quantity,
        LST_Location: item.lst_location,
        LST_Condition: item.lst_condition,
        LST_ShipOption: item.lst_shipoption
    }));
    const listing = listingMap[0];
    return (
        <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
            <div className="card h-[30rem]">
                <p>Listing ID: {listing.LST_ID}</p>
                <p>Product ID: {listing.PRD_ID}</p>
                <p>Time: {listing.LST_Time}</p>
                <p>Status: {listing.LST_Status}</p>
                <p>Price: {listing.LST_Price}</p>
                <p>Quantity: {listing.LST_Quantity}</p>
                <p>Location: {listing.LST_Location}</p>
                <p>Condition: {listing.LST_Condition}</p>
                <p>Shipping Option: {listing.LST_ShipOption}</p>
                <a href={"/updatelisting?IDQuery=" + listing.LST_ID}>
                    <button className="edit-listing">Edit Listing</button>
                </a>
            </div>
        </div>
    );
}
