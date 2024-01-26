import Image from 'next/image';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

async function fetchCardData() {
    const card = await PokemonTCG.findCardByID("xy1-4");
    return card;
}

export default async function ServerComponent() {
    const card = await fetchCardData();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>DB Test Page!</h1>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src={card.images.small}
                    alt={`Image`}
                    width={180}
                    height={37}
                    priority
                />
            </div>
        </main>
    );
}