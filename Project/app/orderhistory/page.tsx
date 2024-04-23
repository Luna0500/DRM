import DisplayOHListings from '@/app/ui/listings/displayOHListings';
import '@/app/cardlist/homePage.css';
import { fetchOHListingsByOH_BuyerEmail, fetchListingsByIDs } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { getServerSession } from 'next-auth';

export default async function Page() {
    const session = await getServerSession();
    const userEmail = session?.user?.email || ''

    const listingsData = await fetchOHListingsByOH_BuyerEmail(userEmail);
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
    if (!session) {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">
                <h1 className="text-5xl text-black">You must be logged in to view order history.</h1>
            </main>
        );
    }
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">

            <h1 className="text-5xl text-black">Order History</h1>
            <DisplayOHListings listings={listings} />


        </main>
    );
}