import '@/app/cardlist/homePage.css';
import { fetchListingsByPRD_ID } from '@/app/lib/data';
import { Listing } from '@/app/ui/listings/listingInterface'

export default async function ListingsByPRD_ID({ IDQuery }: { IDQuery: string; }) {
    // Fetch initial listings data
    const listingsData: any[] = await fetchListingsByPRD_ID(IDQuery);
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
    return (
        <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
            {listings.map(({ LST_ID, PRD_ID, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption }) => (
                <div key={LST_ID} className="card h-[30rem]">
                    <p>Product ID: {PRD_ID}</p>
                    <p>Time: {LST_Time}</p>
                    <p>Status: {LST_Status}</p>
                    <p>Price: {LST_Price}</p>
                    <p>Quantity: {LST_Quantity}</p>
                    <p>Location: {LST_Location}</p>
                    <p>Condition: {LST_Condition}</p>
                    <p>Shipping Option: {LST_ShipOption}</p>
                    <a href={"/updatelisting?IDQuery=" + LST_ID}>
                        <button className="edit-listing">Edit Listing</button>
                    </a>
                </div>
            ))}
        </div>
    );
}
