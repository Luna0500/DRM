'use server';

import '@/app/cardlist/homePage.css';
import Listings from '../ui/listings/displayListings';

export default async function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Listings</h1>
            <Listings />
        </main>
    );
}