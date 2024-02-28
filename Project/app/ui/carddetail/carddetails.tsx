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
        <div className="card-detail">
            <div className="content">
                <h2>{cardObj.data.name}</h2>
                <Image
                    src={`${cardObj.data.images ? cardObj.data.images.large : "/none"}`}
                    alt={`Large Image`}
                    width={400}
                    height={550}
                    priority
                />
                <p>Supertype: {cardObj.data.supertype}</p>
                <p>HP: {cardObj.data.hp}</p>

                <div className="attacks">
                    <h3>Attacks:</h3>

                    {cardObj.data.attacks && cardObj.data.attacks.length > 0 ? (
                        cardObj.data.attacks.map((attack, index) => (
                            <div key={index} className="attack">
                                <p>Name: {attack.name}</p>
                                <p>Cost: {attack.cost.join(', ')}</p>
                                <p>Damage: {attack.damage}</p>
                                <p>Text: {attack.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>No attacks available</p>
                    )}
                </div>
            </div>
        </div>
    );
}