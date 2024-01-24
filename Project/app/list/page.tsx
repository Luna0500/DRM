import Image from 'next/image';
import * as fs from 'fs';

interface Card {
    id: string;
    name: string;
    images: {
        small: string;
    };
    card_ID: string;
}

interface Pricing {
    card_ID: string;
    HP_Price: number;
}

export default function Page() {
    // Read card data from the main JSON file
    let rawData = fs.readFileSync('../Project/public/sampleCards.json', 'utf8');
    let jsonDataArray: Card[] = JSON.parse(rawData);

    // Read pricing data from the separate JSON file
    let pricingData = fs.readFileSync('../Project/public/samplePrice.json', 'utf8');
    let pricingArray: Pricing[] = JSON.parse(pricingData);

    // Create cardData array dynamically from jsonDataArray and pricingArray
    const cardData: (Card & Pricing)[] = jsonDataArray.map((card) => {
        const { id, name, images } = card;
        const imageSrc = images.small;

        // Find pricing information for the current card based on card_IDs
        const pricingInfo = pricingArray.find((pricing) => pricing.card_ID === id);
        const HP_Price = pricingInfo ? pricingInfo.HP_Price : 0;

        return { id, name, images: { small: imageSrc }, card_ID: id, HP_Price };
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>List Page!</h1>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
                {cardData.map(({ id, name, images, HP_Price }, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                        <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            src={images.small}
                            alt={`Image ${index}`}
                            width={180}
                            height={37}
                            priority
                        />
                        <p>{name}</p>
                        <p>Price: ${HP_Price}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
