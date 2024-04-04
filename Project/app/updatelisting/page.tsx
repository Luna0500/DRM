import '@/app/cardlist/homePage.css';
import UpdateListingForm from '@/app/ui/listings/updateListingForm';
import { fetchListingByLST_ID } from '@/app/lib/data';
import { Listing } from '@/app/ui/listings/listingInterfaces'

export default async function Page({
    searchParams,
    }: {
    searchParams?: {
        IDQuery?: number;
    };
    }) {
    const IDQuery = searchParams?.IDQuery || 0;
    // Fetch initial listings data
    const listingsData: any[] = await fetchListingByLST_ID(IDQuery);
    // Map the fetched data to the Listing interface
    const listingMap: Listing[] = listingsData.map((item: any) => ({
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
    const listing = listingMap[0];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Create Listing</h1>
            <UpdateListingForm listing={listing} />
        </main>
    );
}