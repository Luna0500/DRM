import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export default async function DBLOAD(request: Request) {
    /*
    await PokemonTCG.findCardByID("xy12-2")
        .then(card => {
            const cardData = card;
            const cardJsonString = JSON.stringify(cardData);

            // Execute the PostgreSQL query to insert the JSON object into the table

            sql`
              INSERT INTO cards (id, data)
              VALUES (${cardData.id}, ${cardJsonString}::jsonb)
              ON CONFLICT (id) DO UPDATE SET data = ${cardJsonString};
            `;
            console.log("Card Load Success!")
        })
        .catch(error => {
            console.error('Card Load Error:', error);
            throw new Error('Failed to load card data.');
        });
    */
    return <h1>Uncomment to load database.</h1>
    }
