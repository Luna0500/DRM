import Image from 'next/image';
import fs from 'fs';
//import '@/app/cardlist/homePage.css';
import HomeSearch from '@/app/ui/homeSearch';
import { fetchCards, fetchCardsByName, fetchCardsByAttack, fetchCardsByHP } from '@/app/lib/data';
import Cards from '@/app/ui/cardlist/cards';
import PaginationControl from '@/app/ui/paginationControl'
import { useRouter, useSearchParams } from 'next/navigation';
import SearchTags from '@/app/ui/searchTags';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        nameQuery?: string;
        attackQuery?: string;
        hpQuery?: string;
        subtypesQuery?: string;
        typesQuery?: string;
        numberQuery?: string;
        artistQuery?: string;
        rarityQuery?: string;
        page?: string;
    };
    }) {
    const nameQuery = searchParams?.nameQuery || '';
    const attackQuery = searchParams?.attackQuery || '';
    const hpQuery = searchParams?.hpQuery || '';
    const subtypesQuery = searchParams?.subtypesQuery || '';
    const typesQuery = searchParams?.typesQuery || '';
    const numberQuery = searchParams?.numberQuery || '';
    const artistQuery = searchParams?.artistQuery || '';
    const rarityQuery = searchParams?.rarityQuery || '';
    const currentPage = Number(searchParams?.page) || 1;

    // Perform your data fetching here based on query parameters
    const fetchedResult = await fetchCards({ name: nameQuery, attack: attackQuery, hp: hpQuery, subtypes: subtypesQuery, types: typesQuery, number: numberQuery, artist: artistQuery, rarity: rarityQuery, }, currentPage);
    var itemCount = fetchedResult.totalCount;
    var cards = fetchedResult.rows;

    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">Cards</h1>
            <SearchTags />
            <Cards cards={cards} />
            <PaginationControl currentPage={currentPage} itemCount={itemCount} />
        </main>
    );
}