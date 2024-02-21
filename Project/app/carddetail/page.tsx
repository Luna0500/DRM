﻿import Image from 'next/image';
import fs from 'fs';
import Search from '@/app/ui/search';
import { fetchCardsByName } from '@/app/lib/data';
import CardDetail from '@/app/ui/carddetail/carddetails';


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
            <h1 className="text-5xl text-black">Card Detail</h1>
            <CardDetail IDQuery={IDQuery} />
        </main>
    );
}