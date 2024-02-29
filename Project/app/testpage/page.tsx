import '@/app/cardlist/homePage.css';
import ListingByLST_ID from '../ui/listings/displayListingByLST_ID';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        IDQuery?: string;
    };
    }) {
    const IDQuery = searchParams?.IDQuery || '';
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Listing</h1>
            <ListingByLST_ID IDQuery={IDQuery} />
        </main>
    );
}