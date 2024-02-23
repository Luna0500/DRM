import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

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

export async function fetchCardsByName(query: string) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {

        // const data = await sql <JSON>`SELECT * FROM cards WHERE id = 'swsh6-61';`;

        const data = await sql <JSON>`SELECT * FROM cards WHERE data->>'name' ILIKE ${`%${query}%`} ORDER BY data->>'id' LIMIT 28;`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
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

export async function fetchListings() {
    try {
        const data = await sql`SELECT * FROM listing;`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch listing data.');
    }
}

export async function fetchListingsByPRD_ID(query: string) {
    try {
        const data = await sql<JSON>`SELECT * FROM listing WHERE PRD_ID = ${query} ORDER BY LST_ID LIMIT 10;`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch listing data.');
    }
}

export async function createListing(listingData: any) {
    try {
        const { PRD_ID, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption } = listingData;
        const LST_Time = new Date().toISOString();
        const data = await sql<JSON>`INSERT INTO listing (PRD_ID, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption) VALUES (${PRD_ID}, ${LST_Time}, ${LST_Status}, ${LST_Price}, ${LST_Quantity}, ${LST_Location}, ${LST_Condition}, ${LST_ShipOption}) RETURNING *;`;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create listing.');
    }
}

export async function updateListing(listingId: number, updatedData: any) {
    try {
        const { PRD_ID, LST_Time, LST_Status, LST_Price, LST_Quantity, LST_Location, LST_Condition, LST_ShipOption } = updatedData;
        const data = await sql<JSON>`UPDATE listing SET PRD_ID = ${PRD_ID}, LST_Time = ${LST_Time}, LST_Status = ${LST_Status}, LST_Price = ${LST_Price}, LST_Quantity = ${LST_Quantity}, LST_Location = ${LST_Location}, LST_Condition = ${LST_Condition}, LST_ShipOption = ${LST_ShipOption} WHERE LST_ID = ${listingId} RETURNING *;`;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update listing.');
    }
}

export async function deleteListing(listingId: number) {
    try {
        const data = await sql<JSON>`DELETE FROM listing WHERE LST_ID = ${listingId} RETURNING *;`;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete listing.');
    }
}

