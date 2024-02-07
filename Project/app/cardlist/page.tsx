import Image from 'next/image';
import * as fs from 'fs';
import '../cardlist/homePage.css';
import { fetchCards } from '@/app/lib/data';

interface Card {
    id: string;
    data: {
        name: string;
        images: {
            small: string;
        };
    }
    card_ID: string;
}

interface Pricing {
    card_ID: string;
    HP_Price: number[];
}

interface CardWithAveragePrice extends Card, Pricing {
    averagePrice: number;
}

export default async function Page() {
    const exampleCards = await fetchCards();
    const cardsJson = JSON.stringify(exampleCards);
    let cardsObj: Card[] = JSON.parse(cardsJson);
    // Read pricing data from the separate JSON file
    let pricingData = fs.readFileSync('../Project/public/samplePrice.json', 'utf8');
    let pricingArray: Pricing[] = JSON.parse(pricingData);

    // Create cardData array dynamically from jsonDataArray and pricingArray
    const cardData: CardWithAveragePrice[] = await cardsObj.map((card) => {
        const { id, data: { name, images } } = card;
        const imageSrc = images.small;
        // Find pricing information for the current card based on card_IDs
        const pricingInfo = pricingArray.find((pricing) => pricing.card_ID === id);
        const HP_Prices = pricingInfo ? pricingInfo.HP_Price : [];

        // Calculate the average of multiple prices
        const averagePrice = HP_Prices.length > 0 ? HP_Prices.reduce((a, b) => a + b) / HP_Prices.length : 0;

        return { id, data: { name, images: { small: imageSrc } }, card_ID: id, HP_Price: HP_Prices, averagePrice };
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Listings</h1>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
                {cardData.map(({ id, data: { name, images }, HP_Price, averagePrice }, index) => (
                    <div key={index} className="card">
                        <Image
                            className="relative "
                            src={`${images ? images.small: " / none"}`}
                            alt={`Image ${index}`}
                            width={180}
                            height={37}
                            priority
                        />
                        <p className="title">{name}</p>
                        <p className="price">Price: ${averagePrice.toFixed(2)}</p>
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

