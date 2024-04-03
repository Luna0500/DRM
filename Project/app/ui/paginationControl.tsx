'use client';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { SearchTypeSelector, searchTypes } from '@/app/ui/searchTypeSelector'

export default function PaginationControl({ nameQuery, attackQuery, hpQuery, currentPage, itemCount }: { nameQuery: string; attackQuery: string; hpQuery: string; currentPage: number; itemCount: number }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    var params = new URLSearchParams();
    const [inputPage, setInputPage] = useState(currentPage.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    const totalPages = Math.ceil(itemCount / 30);

    const navigateToPage = (page: number) => {
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
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
            setInputPage(page.toString());
            replace(`cardlist/?${params.toString()}`);
        }
    };

    const handleInputChange = (e: any) => {
        setInputPage(e.target.value);
    };

    const handleInputConfirm = (e: any) => {
        if (e.key === 'Enter') {
            const page = parseInt(inputPage, 10);
            // Update to navigate on Enter press, with validation
            navigateToPage(page);
            // Reset inputPage to reflect current page or stay blank if invalid
            setInputPage(isNaN(page) ? '' : page.toString());
            if (inputRef.current) inputRef.current.blur();
        }
    };

    const handleInputBlur = () => {
        // Validate and navigate on blur, reverting to the current page if input is invalid
        const page = parseInt(inputPage, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            navigateToPage(page);
        } else {
            // Reset inputPage to current page if input is cleared or invalid
            setInputPage(currentPage.toString());
        }
    };

    return (
        <div className="pagination-controls flex justify-between items-center w-96">
            
            <button className={`pagination-buttons hover:bg-[#02ad52] w-20 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>
            
            <label className="font-bold">
                Page
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={currentPage.toString()}
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={handleInputConfirm}
                    onBlur={handleInputBlur}
                    className="mx-2 w-12 text-center"
                    min="1"
                    max={totalPages}
                />
                of {totalPages}
            </label>
            
            <button className={`pagination-buttons hover:bg-[#02ad52] w-20 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage == totalPages}>
                Next
                </button>
           
        </div>
    )
}
