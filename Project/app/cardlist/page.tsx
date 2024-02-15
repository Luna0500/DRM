import Image from 'next/image';
import fs from 'fs';
import '@/app/cardlist/homePage.css';
import Search from '@/app/ui/search';
import { fetchCardsByName } from '@/app/lib/data';
import Cards from '@/app/ui/cardlist/cards';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        nameQuery?: string;
    };
    }) {
    const nameQuery = searchParams?.nameQuery || '';
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Cards</h1>
            <div className="flex items-end h-12">
                <Search placeholder="Search cards..." />
            </div>
            <Cards nameQuery={nameQuery}/>
        </main>
    );
}