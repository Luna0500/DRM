'use client';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchTypeSelector, searchTypes } from '@/app/ui/searchTypeSelector'

export default function PaginationControl({ nameQuery, attackQuery, hpQuery, currentPage }: { nameQuery: string; attackQuery: string; hpQuery: string; currentPage: number }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    var params = new URLSearchParams();

    const navigateToPage = (page: number) => {
        if (searchParams.get('nameQuery')) {
            params.set('nameQuery', searchParams.get('nameQuery') || '');
        }
        if (searchParams.get('attackQuery')) {
            params.set('attackQuery', searchParams.get('attackQuery') || '');
        }
        if (searchParams.get('hpQuery')) {
            params.set('hpQuery', searchParams.get('hpQuery') || '');
        }
        params.set('page', page.toString());
        replace(`cardlist/?${params.toString()}`);
    };

    return (
        <div className="pagination-controls">
            <button onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => navigateToPage(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}
