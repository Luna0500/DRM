'use client';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchTypeSelector, searchTypes } from '@/app/ui/searchTypeSelector'

export default function HomeSearch({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSearchType, setSelectedSearchType] = useState(searchTypes[0]);

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set(selectedSearchType.queryType, searchTerm);
        } else {
            params.delete(selectedSearchType.queryType);
        }

        params.set('page', '1');
        replace(`cardlist/?${params.toString()}`);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };
    
    return ( 
            <div>
            
                <form onSubmit={handleSubmit} className="relative flex flex-1 flex-shrink-0">
                   
                        
                   
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                id="search"
                className="peer block w-[600px] items-center rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                    />
                
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                
                </form>
            <SearchTypeSelector selected={selectedSearchType} setSelected={setSelectedSearchType} />
            </div>
            
        )
    
    
}
