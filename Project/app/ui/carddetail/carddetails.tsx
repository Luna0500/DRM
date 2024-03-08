import Image from 'next/image';
import '@/app/cardlist/homePage.css';
import React from 'react';
import { fetchCardByID } from '@/app/lib/data';



export interface CardDetail {
    id: string;
    data: {
        name: string;
        supertype: string;
        subtypes: string[];
        hp: string;
        types: string[];
        evolvesTo: string[];
        rules: string[];
        attacks: {
            name: string;
            cost: string[];
            convertedEnergyCost: number;
            damage: string;
            text: string;
        }[];
        weaknesses: {
            type: string;
            value: string;
        }[];
        retreatCost: string[];
        convertedRetreatCost: number;
        number: string;
        artist: string;
        rarity: string;
        nationalPokedexNumbers: number[];
        legalities: {
            unlimited: string;
            expanded: string;
        };
        images: {
            small: string;
            large: string;
        }
    }
}

export default async function CardDetail({ IDQuery }: { IDQuery: string; }) {
    IDQuery = IDQuery ? IDQuery : '';
    const Card = await fetchCardByID(IDQuery);
    const cardsJson = JSON.stringify(Card[0]);
    let cardObj: CardDetail = JSON.parse(cardsJson);



    return (
        <div className="card-detail bg-opacity-70 border border-gray-800 p-4 rounded-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 md:mr-4">
                    <Image
                        unoptimized
                        src={`${cardObj.data.images ? cardObj.data.images.large : "/none"}`}
                        alt={`Large Image`}
                        width={400}
                        height={550}
                        priority
                        className="rounded-md"
                    />
                </div>
                <div className="mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold mb-2">{cardObj.data.name}</h2>
                    <p className="mb-2">Supertype: {cardObj.data.supertype || "Information not available"}</p>
                    <p className="mb-2">Subtypes: {cardObj.data.subtypes?.join(', ') || "Information not available"}</p>
                    <p className="mb-2">HP: {cardObj.data.hp || "Information not available"}</p>
                    <p className="mb-2">Types: {cardObj.data.types?.join(', ') || "Information not available"}</p>

                    {cardObj.data.evolvesTo && cardObj.data.evolvesTo.length > 0 ? (
                        <p className="mb-2">Evolves To: {cardObj.data.evolvesTo.join(', ')}</p>
                    ) : (
                        <p>Evolves To: Information not available</p>
                    )}

                    {cardObj.data.rules && cardObj.data.rules.length > 0 ? (
                        <p className="mb-2">Rules: {cardObj.data.rules.join(', ')}</p>
                    ) : (
                        <p>Rules: Information not available</p>
                    )}

                    <div className="attacks">
                        <h3 className="text-xl font-bold mb-2">Attacks:</h3>

                        {cardObj.data.attacks && cardObj.data.attacks.length > 0 ? (
                            cardObj.data.attacks.map((attack, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-bold">Name: {attack.name}</p>
                                    <p>Cost: {attack.cost.join(', ')}</p>
                                    <p>Converted Energy Cost: {attack.convertedEnergyCost}</p>
                                    <p>Damage: {attack.damage}</p>
                                    <p>Text: {attack.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>No attacks available</p>
                        )}
                    </div>

                    <div className="weaknesses">
                        <h3 className="text-xl font-bold mb-2 mt-4">Weaknesses:</h3>
                        {cardObj.data.weaknesses && cardObj.data.weaknesses.length > 0 ? (
                            cardObj.data.weaknesses.map((weakness, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-bold">Type: {weakness.type}</p>
                                    <p>Value: {weakness.value}</p>
                                </div>
                            ))
                        ) : (
                            <p>No weaknesses available</p>
                        )}
                    </div>

                    <p>Retreat Cost: {cardObj.data.retreatCost?.join(', ') || "Information not available"}</p>
                    <p>Converted Retreat Cost: {cardObj.data.convertedRetreatCost || "Information not available"}</p>
                    <p>Number: {cardObj.data.number || "Information not available"}</p>
                    <p>Artist: {cardObj.data.artist || "Information not available"}</p>
                    <p>Rarity: {cardObj.data.rarity || "Information not available"}</p>
                    <p>National Pokedex Numbers: {cardObj.data.nationalPokedexNumbers?.join(', ') || "Information not available"}</p>
                </div>
            </div>
        </div>
    );
}