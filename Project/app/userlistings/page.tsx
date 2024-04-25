import ListingsByLST_UserEmail from '@/app/ui/listings/displayListingsByLST_UserEmail';
import '@/app/cardlist/homePage.css';
import { fetchListingsByLST_UserEmail } from '@/app/lib/data';
import { getServerSession } from 'next-auth';

export default async function Page() {
    const session = await getServerSession();
    const userEmail = session?.user?.email || ''

    const listingsData = await fetchListingsByLST_UserEmail(userEmail);

    if (!session) {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">
                <h1 className="text-5xl text-black">You must be logged in to view your listings.</h1>
            </main>
        );
    }
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">

            <h1 className="text-5xl text-black">Your Listings</h1>
            <ListingsByLST_UserEmail listingsData={listingsData} />

        </main>
    );
}