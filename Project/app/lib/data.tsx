import { sql } from '@vercel/postgres';

export async function fetchCards() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    try {

        // const data = await sql <JSON>`SELECT * FROM cards WHERE id = 'swsh6-61';`;

        const data = await sql <JSON>`SELECT * FROM cards WHERE data->>'name' = 'Eevee';`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}