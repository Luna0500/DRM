import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { sql } from '@vercel/postgres';
const { db } = require('@vercel/postgres');
import { createClient } from '@vercel/postgres';
/*
export default async function seedCards() {
    
    try {

        // Create the "cards" table if it doesn't exist
        const createTable = await sql`
            CREATE TABLE IF NOT EXISTS cards (
              id varchar UNIQUE NOT NULL,
              data jsonb
            );
        `;

        console.log(`Created "cards" table!`);

        // All Cards

        //const fetchedCards = await PokemonTCG.getAllCards();
        //console.log("Cards Fetched!");


        // One Page of Cards

        //const params: PokemonTCG.Parameter[] = { page: 70, pageSize: 250 };
        //const fetchedCards = await PokemonTCG.findCardsByQueries(params);
        //console.log("Cards Fetched!");


        // Insert data into the "cards" table

        const insertedCards = await Promise.all(
            fetchedCards.map(
                (card) => sql`
                    INSERT INTO cards (id, data)
                    VALUES (${card.id}, ${JSON.stringify(card)}::jsonb)
                    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(card)};
                `,
            ),
        );

        console.log(`Seeded ${insertedCards.length} cards`);

    } catch (error) {
        console.error('Error seeding cards:', error);
        throw error;
}
    
}
*/