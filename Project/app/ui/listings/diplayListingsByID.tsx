import { fetchListingsServerAction } from '@/app/actions';
import { fetchListingsByPRD_ID } from '@/app/lib/data';


export interface Listing {
    LST_ID: number;
    PRD_ID: string;
    LST_Time: string;
    LST_Status: string;
    LST_Price: number;
    LST_Quantity: number;
    LST_Location: string;
    LST_Condition: string;
    LST_ShipOption: string;
}

export default async function Listings({ IDQuery }: { IDQuery: string; }) {
    // Fetch initial listings data
    const listingsData: any[] = await fetchListingsByPRD_ID(IDQuery);
    // Map the fetched data to the Listing interface
    const listings: Listing[] = listingsData.map((item: any) => ({
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
                </div>
            ))}
        </div>
    );
}
