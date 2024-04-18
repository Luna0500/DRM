'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchTags = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const nameQuery = searchParams.get('nameQuery');
    const attackQuery = searchParams.get('attackQuery');
    const hpQuery = searchParams.get('hpQuery');

    const removeSearchParam = (param: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(param);
        params.set('page', '1'); // Reset to the first page on search change
        replace(`cardlist/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {nameQuery && (
                <span className="bg-blue-200 text-blue-800 rounded-full px-4 py-1 cursor-pointer"
                    onClick={() => removeSearchParam('nameQuery')}>
                    Name: {nameQuery} <span className="font-bold">x </span>
                </span>
            )}
            {attackQuery && (
                <span className="bg-blue-200 text-blue-800 rounded-full px-4 py-1 cursor-pointer"
                    onClick={() => removeSearchParam('attackQuery')}>
                    Attack: {attackQuery} <span className="font-bold">x </span>
                </span>
            )}
            {hpQuery && (
                <span className="bg-blue-200 text-blue-800 rounded-full px-4 py-1 cursor-pointer"
                    onClick={() => removeSearchParam('hpQuery')}>
                    HP: {hpQuery} <span className="font-bold">x </span>
                </span>
            )}
        </div>
    );
};

export default SearchTags;