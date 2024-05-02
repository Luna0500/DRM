import DisplayCartListings from '@/app/ui/listings/displayCartListings';
import CartBuyButton from '@/app/ui/cartBuyButton';
import '@/app/cardlist/homePage.css';
import { fetchCartListingsByCL_Email, fetchListingsByIDs } from '@/app/lib/data';
import { Listing, CartListing } from '@/app/ui/listings/listingInterfaces';
import { getServerSession } from 'next-auth';
import { split } from 'postcss/lib/list';

export default async function Page() {
    const session = await getServerSession();
    const userEmail = session?.user?.email || ''

    const cartListingsData = await fetchCartListingsByCL_Email(userEmail);
    const cartListings: CartListing[] = cartListingsData.map((item: any) => ({
        CL_ID: item.cl_id,
        LST_ID: item.lst_id,
        CL_Email: item.cl_email,
        CL_Quantity: item.cl_quantity
    }));
    const lstIds = cartListings.map(item => item.LST_ID);
    const listingsData = await fetchListingsByIDs(lstIds);
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
    var total = 0;
    for (let i = 0; i < listings.length; i++) {
        total += parseFloat(listings[i].LST_Price.substring(1)) * listings[i].LST_Quantity
    }
    parseFloat
    if (!session) {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">
                <h1 className="text-5xl text-black">You must be logged in to use the cart.</h1>
            </main>
        );
    }
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">

            <h1 className="text-5xl text-black">Shopping Cart</h1>     
            <DisplayCartListings listings={listings} userEmail={userEmail} />
            <h1 className="text-5xl text-black">Total: ${ total }</h1> 
            <CartBuyButton listings={listings} userEmail={userEmail} />
      
        </main>
    );
}