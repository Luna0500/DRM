'use client';

import '@/app/cardlist/homePage.css';
import { deleteListing } from '@/app/lib/data'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function DeleteListing({
    searchParams,
}: {
    searchParams?: {
        IDQuery?: number;
    };
    }) {
    const IDQuery = searchParams?.IDQuery || 0;
    const router = useRouter();

    deleteListing(IDQuery);
    router.push('/cardlist');
}