'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchTags = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const queries = {
        nameQuery: searchParams.get('nameQuery'),
        attackQuery: searchParams.get('attackQuery'),
        hpQuery: searchParams.get('hpQuery'),
        subtypesQuery: searchParams.get('subtypesQuery'),
        typesQuery: searchParams.get('typesQuery'),
        numberQuery: searchParams.get('numberQuery'),
        artistQuery: searchParams.get('artistQuery'),
        rarityQuery: searchParams.get('rarityQuery')
    };

    const removeSearchParam = (param: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(param);
        params.set('page', '1'); // Reset to the first page on search change
        replace(`cardlist/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(queries).map(([key, value]) => value && (
                <span key={key} className="bg-blue-200 text-blue-800 rounded-full px-4 py-1 cursor-pointer"
                    onClick={() => removeSearchParam(key)}>
                    {key.replace('Query', '')}: {value} <span className="font-bold"> x</span>
                </span>
            ))}
        </div>
    );
};

export default SearchTags;