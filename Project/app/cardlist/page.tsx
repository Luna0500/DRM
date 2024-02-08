import Image from 'next/image';
import * as fs from 'fs';
import '../cardlist/homePage.css';
import Search from '@/app/ui/search';
import { fetchCardsByName } from '@/app/lib/data';

interface Card {
    id: string;
    data: {
        name: string;
        images: {
            small: string;
        };
    };
    card_ID: string;
    seed_price: number; // Include seed_price from the cards table
}

interface Pricing {
    card_ID: string;
    HP_Price: number[];
}

interface CardWithAveragePrice extends Card, Pricing {
    averagePrice: number;
}

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        nameQuery?: string;
    };
}) {
    const nameQuery = searchParams?.nameQuery || '';
    const exampleCards = await fetchCardsByName(nameQuery);
    const cardsJson = JSON.stringify(exampleCards);
    let cardsObj: Card[] = JSON.parse(cardsJson);
    // Read pricing data from the separate JSON file
    let pricingData = fs.readFileSync('../Project/public/samplePrice.json', 'utf8');
    let pricingArray: Pricing[] = JSON.parse(pricingData);

    // Create a map for easy access to pricing data
    const pricingMap = new Map(pricingArray.map(pricing => [pricing.card_ID, pricing]));

    // Create cardData array dynamically from cardsObj
    const cardData: CardWithAveragePrice[] = await cardsObj.map((card) => {
        const { id, data: { name, images }, seed_price } = card;
        const imageSrc = images.small;
        // Find pricing information for the current card based on card_IDs
        const pricingInfo = pricingMap.get(id);
        const HP_Prices = pricingInfo ? pricingInfo.HP_Price : [];

        // Calculate the average of multiple prices if HP_Prices are available
        let averagePrice = 0;
        if (HP_Prices.length > 0) {
            averagePrice = HP_Prices.reduce((a, b) => a + b) / HP_Prices.length;
        } else if (seed_price) {
            averagePrice = seed_price;
        }

        return { id, data: { name, images: { small: imageSrc } }, card_ID: id, seed_price, HP_Price: HP_Prices, averagePrice };
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Listings</h1>
            <div className="flex items-end h-12">
                <Search placeholder="Search cards..." />
            </div>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
                {cardData.map(({ id, data: { name, images }, HP_Price, averagePrice }, index) => (
                    <div key={index} className="card">
                        <Image
                            className="relative "
                            src={`${images ? images.small : " / none"}`}
                            alt={`Image ${index}`}
                            width={180}
                            height={37}
                            priority
                        />
                        <p className="title">{name}</p>
                        <p className="price">Price: ${averagePrice}</p>
                        <div className="buttons">
                            <button className="buy-now">Buy Now</button>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
