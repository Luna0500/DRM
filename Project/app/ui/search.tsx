'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    // This makes it so that it waits 600ms since last update to the input so it can search automatically without too many queries
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('nameQuery', term);
        } else {
            params.delete('nameQuery');
        }
        replace(`cardlist/?${params.toString()}`);
    }, 600);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('nameQuery')?.toString()}
            />
            <select name="card choice" className="rounded-md border border-gray-200 py-[9px] text-sm text-black placeholder:text-gray-500">
                <option value="Name">Name</option>
                <option value="Type">Type</option>
                <option value="Attack">Attack</option>
                <option value="Price">Price</option>
            </select>
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}