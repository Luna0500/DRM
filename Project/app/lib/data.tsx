'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Listing } from '@/app/ui/listings/listingInterface'
import { useRouter } from 'next/navigation'

interface CardRow {
    total_count: string;
    data: JSON[];
}

export async function fetchCards() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {

        // const data = await sql <JSON>`SELECT * FROM cards WHERE id = 'swsh6-61';`;

        const data = await sql <JSON>`SELECT * FROM cards WHERE data->>'name' = 'Eevee';`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchCardsByName(query: string, page: number = 1) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    const limit = 30;
    const offset = (page - 1) * limit
    try {

        // const data = await sql <JSON>`SELECT * FROM cards WHERE id = 'swsh6-61';`;

        const result = await sql <CardRow>`SELECT COUNT(*) OVER() AS total_count, * FROM cards WHERE data->>'name' ILIKE ${`%${query}%`} ORDER BY data->>'id' LIMIT ${limit} OFFSET ${offset};`;
        const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count, 10) : 0;
        const rows = result.rows;

        return { totalCount, rows };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchCardsByAttack(query: string, page: number = 1) {
    noStore();
    const limit = 30;
    const offset = (page - 1) * limit
    try {
        const result = await sql<CardRow>`SELECT COUNT(*) OVER() AS total_count, * FROM cards WHERE data->>'attacks' ILIKE ${`%${query}%`} ORDER BY data->>'id' LIMIT ${limit} OFFSET ${offset};`;
        const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count, 10) : 0;
        const rows = result.rows;

        return { totalCount, rows };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data by attack.');
    }
}

export async function fetchCardsByHP(query: string, page: number = 1) {
    noStore();
    const limit = 30;
    const offset = (page - 1) * limit
    try {
        const result = await sql<CardRow>`SELECT COUNT(*) OVER() AS total_count, * FROM cards WHERE data->>'hp' = ${query} ORDER BY data->>'id' LIMIT ${limit} OFFSET ${offset};`;
        const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count, 10) : 0;
        const rows = result.rows;

        return { totalCount, rows };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data by hit points.');
    }
}

export async function fetchCardByID(query: string) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {

        // const data = await sql <JSON>`SELECT * FROM cards WHERE id = 'swsh6-61';`;

        const data = await sql <JSON>`SELECT * FROM cards WHERE data->>'id' = ${query};`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchListingsByPRD_ID(query: string) {
    noStore();
    try {
        const data = await sql<JSON>`SELECT * FROM listing WHERE PRD_ID = ${query} ORDER BY LST_ID LIMIT 10;`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch listing data.');
    }
}

export async function fetchListingByLST_ID(query: number) {
    noStore();
    try {
        const data = await sql<JSON>`SELECT * FROM listing WHERE LST_ID = ${query};`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch listing data.');
    }
}

export async function createListing(listingData: any, userEmail: any) {
    try {
        const { PRD_ID, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption } = listingData;
        const LST_Time = new Date().toISOString();
        const data = await sql<JSON>`INSERT INTO listing (PRD_ID, LST_UserEmail, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption) VALUES (${PRD_ID}, ${userEmail}, ${LST_Time}, ${LST_Status}, ${LST_Price}, ${LST_Quantity}, ${LST_Location}, ${LST_Condition}, ${LST_ShipOption}) RETURNING *;`;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create listing.');
    }
}

export async function updateListing(listingId: number, updatedData: any) {
    try {
        const { PRD_ID, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption } = updatedData;
        const LST_Time = new Date().toISOString();
        console.log(updatedData)
        const data = await sql<JSON>`UPDATE listing SET PRD_ID = ${PRD_ID}, LST_Time = ${LST_Time}, LST_Status = ${LST_Status}, LST_Price = ${LST_Price}, LST_Quantity = ${LST_Quantity}, LST_Location = ${LST_Location}, LST_Condition = ${LST_Condition}, LST_ShipOption = ${LST_ShipOption} WHERE LST_ID = ${listingId} RETURNING *;`;

        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update listing.');
    }
}

export async function deleteListing(listingId: number) {
    const data = await sql<JSON>`DELETE FROM listing WHERE LST_ID = ${listingId} RETURNING *;`;
    return data.rows[0];
}

