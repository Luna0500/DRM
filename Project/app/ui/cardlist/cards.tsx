/* Site Example
import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function CardWrapper() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <>
            <Card title="Collected" value={totalPaidInvoices} type="collected" />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
            <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
*/

import Image from 'next/image';
import fs from 'fs';
import '@/app/cardlist/homePage.css';
import Search from '@/app/ui/search';
import { fetchCardsByName, fetchCardsByAttack, fetchCardsByHP } from '@/app/lib/data';
import React from 'react';

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
const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
        return name.substring(0, maxLength - 3) + '...';
    }
    return name;
};
export default async function Cards({ nameQuery, attackQuery, hpQuery }: { nameQuery: string; attackQuery: string; hpQuery: number })
{
    nameQuery = nameQuery ? nameQuery : '';
    var fetchedCards = await fetchCardsByName(nameQuery);
    if (attackQuery) {
        fetchedCards = await fetchCardsByAttack(attackQuery);
    } else if (hpQuery) {
        fetchedCards = await fetchCardsByHP(hpQuery);
    }
    const cardsJson = JSON.stringify(fetchedCards);
    let cardsObj: Card[] = JSON.parse(cardsJson);

    let pricingArray: Pricing[] = [];
    try {
        // Read pricing data from the separate JSON file
        const pricingData = fs.readFileSync('public/samplePrice.json', 'utf8');
        pricingArray = JSON.parse(pricingData);
    } catch (error) {
        console.error('Error reading pricing data:', error);
    }

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
        <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
            {cardData.map(({ id, data: { name, images }, HP_Price, averagePrice }, index) => (
                <div key={index} className="card-container bg-white rounded-lg overflow-hidden shadow-md p-4 mb-8">
                    <div className="grid grid-cols-2">
                        {/* Card Image */}
                        <div className="p-4">
                            <a href={"/carddetail?IDQuery=" + id}>
                                <Image
                                    className="relative"
                                    src={`${images ? images.small : "/none"}`}
                                    alt={`Image ${index}`}
                                    width={120}  // Adjust the width according to your preference
                                    height={165} // Adjust the height according to your preference
                                    priority
                                />
                            </a>
                        </div>

                        {/* Card Information */}
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-4">{truncateName(name, 10)}</h2>
                            <p className="price">Price: ${averagePrice}</p>
                            {/* View Listings Button */}
                            <a href={`/listings?cardID=${id}`} className="view-listings-button bg-blue-500 text-white py-2 px-4 mt-4 inline-block hover:bg-blue-700">
                                View Listings
                            </a>
                        </div>
                    </div>
                </div>
            ))}     
        </div>
    );
}