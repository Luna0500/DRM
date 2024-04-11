import Image from 'next/image';
import fs from 'fs';
//import '@/app/cardlist/homePage.css';
import HomeSearch from '@/app/ui/homeSearch';
import { fetchCards, fetchCardsByName, fetchCardsByAttack, fetchCardsByHP } from '@/app/lib/data';
import Cards from '@/app/ui/cardlist/cards';
import PaginationControl from '@/app/ui/paginationControl'
import { useRouter, useSearchParams } from 'next/navigation';

export default async function Page({
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

    // Perform your data fetching here based on query parameters
    const fetchedResult = await fetchCards({ name: nameQuery, attack: attackQuery, hp: hpQuery }, currentPage);
    var itemCount = fetchedResult.totalCount; // Assuming fetchCardsByName returns an object with totalCount
    var cards = fetchedResult.rows; // Assuming rows contains the cards data

    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">Cards</h1>
            <Cards cards={cards} />
            <PaginationControl nameQuery={nameQuery} attackQuery={attackQuery} hpQuery={hpQuery} currentPage={currentPage} itemCount={itemCount} />
        </main>
    );
}