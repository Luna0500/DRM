import Image from 'next/image';
import fs from 'fs';
//import '@/app/cardlist/homePage.css';
import HomeSearch from '@/app/ui/homeSearch';
import { fetchCardsByName } from '@/app/lib/data';
import Cards from '@/app/ui/cardlist/cards';
import PaginationControl from '@/app/ui/paginationControl'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page({
    searchParams,
}: {
    searchParams?: {
        nameQuery?: string;
        attackQuery?: string;
        hpQuery?: string;
        page?: string;
    };
    }) {
    const nameQuery = searchParams?.nameQuery || '';
    const attackQuery = searchParams?.attackQuery || '';
    const hpQuery = searchParams?.hpQuery || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">Cards</h1>
            <div className="flex items-end h-18">
                <HomeSearch placeholder="Search cards..." />
            </div>
            <Cards nameQuery={nameQuery} attackQuery={attackQuery} hpQuery={hpQuery} currentPage={currentPage} />
            <PaginationControl nameQuery={nameQuery} attackQuery={attackQuery} hpQuery={hpQuery} currentPage={currentPage} />
        </main>
    );
}