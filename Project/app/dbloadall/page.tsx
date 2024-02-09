import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { sql } from '@vercel/postgres';
const { db } = require('@vercel/postgres');
import { createClient } from '@vercel/postgres';

export default async function seedCards() {
    /*
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
    */
   return <h1>Uncomment to seed cards</h1>
}

//Ended up just creating a new seed_price column for cards instead to deliver the data together (see below)
/*
-- Create the new table seed_prices
CREATE TABLE seed_prices (
    id varchar UNIQUE NOT NULL,
    price NUMERIC
);

-- Insert data into seed_prices from the previous query
INSERT INTO seed_prices (id, price)
SELECT data->>'id' AS id,
    CASE 
        WHEN (data->'tcgplayer'->'prices'->>'normal' IS NULL) AND 
             (data->'tcgplayer'->'prices'->>'holofoil' IS NULL) AND 
             (data->'tcgplayer'->'prices'->>'reverseHolofoil' IS NULL) 
             AND (data->'cardmarket'->'prices'->>'trendPrice' IS NULL)
             AND (data->'cardmarket'->'prices'->>'reverseHoloTrend' IS NULL)
        THEN NULL 
        ELSE
            ROUND(
                (
                    COALESCE((data->'tcgplayer'->'prices'->'normal'->>'mid')::numeric, 0) +
                    COALESCE((data->'tcgplayer'->'prices'->'holofoil'->>'mid')::numeric, 0) +
                    COALESCE((data->'tcgplayer'->'prices'->'reverseHolofoil'->>'mid')::numeric, 0) +
                    COALESCE((data->'cardmarket'->'prices'->>'trendPrice')::numeric, 0) +
                    COALESCE((data->'cardmarket'->'prices'->>'reverseHoloTrend')::numeric, 0)
                ) /
                NULLIF(
                    (
                        CASE WHEN data->'tcgplayer'->'prices'->'normal'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'tcgplayer'->'prices'->'holofoil'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'tcgplayer'->'prices'->'reverseHolofoil'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'cardmarket'->'prices'->>'trendPrice' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'cardmarket'->'prices'->>'reverseHoloTrend' IS NOT NULL THEN 1 ELSE 0 END
                    ),
                    0
                ),
                3
            )
    END AS price
FROM cards;
*/

// Query below was used for testing before the above queries were executed to actually seed all prices.
/*
SELECT
    CASE 
        WHEN data->'tcgplayer'->'prices'->'normal' IS NOT NULL 
        THEN (data->'tcgplayer'->'prices'->'normal'->>'mid')::numeric 
        ELSE NULL 
    END AS normal_mid,
    CASE 
        WHEN data->'tcgplayer'->'prices'->'holofoil' IS NOT NULL 
        THEN (data->'tcgplayer'->'prices'->'holofoil'->>'mid')::numeric 
        ELSE NULL 
    END AS holofoil_mid,
    CASE 
        WHEN data->'tcgplayer'->'prices'->'reverseHolofoil' IS NOT NULL 
        THEN (data->'tcgplayer'->'prices'->'reverseHolofoil'->>'mid')::numeric 
        ELSE NULL 
    END AS reverse_holofoil_mid,
    CASE 
        WHEN data->'cardmarket'->'prices'->>'trendPrice' IS NOT NULL 
        THEN (data->'cardmarket'->'prices'->>'trendPrice')::numeric 
        ELSE NULL 
    END AS cardmarket_trend_price,
    CASE 
        WHEN data->'cardmarket'->'prices'->>'reverseHoloTrend' IS NOT NULL 
        THEN (data->'cardmarket'->'prices'->>'reverseHoloTrend')::numeric 
        ELSE NULL 
    END AS cardmarket_reverse_holo_trend,
    CASE 
        WHEN (data->'tcgplayer'->'prices'->>'normal' IS NULL) AND 
             (data->'tcgplayer'->'prices'->>'holofoil' IS NULL) AND 
             (data->'tcgplayer'->'prices'->>'reverseHolofoil' IS NULL) 
             AND (data->'cardmarket'->'prices'->>'trendPrice' IS NULL)
             AND (data->'cardmarket'->'prices'->>'reverseHoloTrend' IS NULL)
        THEN NULL 
        ELSE
            ROUND(
                (
                    COALESCE((data->'tcgplayer'->'prices'->'normal'->>'mid')::numeric, 0) +
                    COALESCE((data->'tcgplayer'->'prices'->'holofoil'->>'mid')::numeric, 0) +
                    COALESCE((data->'tcgplayer'->'prices'->'reverseHolofoil'->>'mid')::numeric, 0) +
                    COALESCE((data->'cardmarket'->'prices'->>'trendPrice')::numeric, 0) +
                    COALESCE((data->'cardmarket'->'prices'->>'reverseHoloTrend')::numeric, 0)
                ) /
                NULLIF(
                    (
                        CASE WHEN data->'tcgplayer'->'prices'->'normal'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'tcgplayer'->'prices'->'holofoil'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'tcgplayer'->'prices'->'reverseHolofoil'->>'mid' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'cardmarket'->'prices'->>'trendPrice' IS NOT NULL THEN 1 ELSE 0 END +
                        CASE WHEN data->'cardmarket'->'prices'->>'reverseHoloTrend' IS NOT NULL THEN 1 ELSE 0 END
                    ),
                    0
                ),
                2
            )
    END AS average_mid
FROM cards
LIMIT 10;
*/

// This code ended up being better for fetching data
/*
--Add a new column named "price" to the "cards" table
ALTER TABLE cards ADD COLUMN seed_price NUMERIC;

--Update the "price" column with calculated values for each card
UPDATE cards
SET seed_price =
    CASE
WHEN(data -> 'tcgplayer' -> 'prices' ->> 'normal' IS NULL) AND
    (data -> 'tcgplayer' -> 'prices' ->> 'holofoil' IS NULL) AND
        (data -> 'tcgplayer' -> 'prices' ->> 'reverseHolofoil' IS NULL)
AND(data -> 'cardmarket' -> 'prices' ->> 'trendPrice' IS NULL)
AND(data -> 'cardmarket' -> 'prices' ->> 'reverseHoloTrend' IS NULL)
        THEN NULL
ELSE
ROUND(
    (
        COALESCE((data -> 'tcgplayer' -> 'prices' -> 'normal' ->> 'mid'):: numeric, 0) +
        COALESCE((data -> 'tcgplayer' -> 'prices' -> 'holofoil' ->> 'mid'):: numeric, 0) +
        COALESCE((data -> 'tcgplayer' -> 'prices' -> 'reverseHolofoil' ->> 'mid'):: numeric, 0) +
        COALESCE((data -> 'cardmarket' -> 'prices' ->> 'trendPrice'):: numeric, 0) +
        COALESCE((data -> 'cardmarket' -> 'prices' ->> 'reverseHoloTrend'):: numeric, 0)
    ) /
    NULLIF(
        (
    CASE WHEN data -> 'tcgplayer' -> 'prices' -> 'normal' ->> 'mid' IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN data -> 'tcgplayer' -> 'prices' -> 'holofoil' ->> 'mid' IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN data -> 'tcgplayer' -> 'prices' -> 'reverseHolofoil' ->> 'mid' IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN data -> 'cardmarket' -> 'prices' ->> 'trendPrice' IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN data -> 'cardmarket' -> 'prices' ->> 'reverseHoloTrend' IS NOT NULL THEN 1 ELSE 0 END
    ),
    0
),
    2
            )
END
WHERE id IN(
    SELECT data ->> 'id' FROM cards
);
*/