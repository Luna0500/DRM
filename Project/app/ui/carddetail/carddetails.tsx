import Image from 'next/image';
import { useRouter } from 'next/router';
import '@/app/carddetail/cardDetail.css'; // You can create a CSS file for styling
import React from 'react';
export interface CardDetailProps {
    cardDetails: {
        id: string;
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
        };
    };
}

const CardDetail: React.FC<CardDetailProps> = ({ cardDetails }) => {
    const router = useRouter();

    // Handle back navigation
    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="card-detail">
            <div className="header">
                <button className="back-button" onClick={handleGoBack}>
                    Back
                </button>
            </div>
            <div className="content">
                <h2>{cardDetails.name}</h2>
                <Image
                    src={cardDetails.images.large}
                    alt={`Large Image`}
                    width={400}
                    height={550}
                    priority
                />
                {/* Display other card details here */}
                <p>Supertype: {cardDetails.supertype}</p>
                <p>HP: {cardDetails.hp}</p>
                {/* Add more details based on card data structure */}
                {/* can also map through arrays like subtypes, weaknesses, etc. to display them */}

                {/* Display Attacks */}
                <div className="attacks">
                    <h3>Attacks:</h3>
                    {cardDetails.attacks.map((attack, index) => (
                        <div key={index} className="attack">
                            <p>Name: {attack.name}</p>
                            <p>Cost: {attack.cost.join(', ')}</p>
                            <p>Damage: {attack.damage}</p>
                            <p>Text: {attack.text}</p>
                        </div>
                    ))}
                </div>

                {/* Display other details as needed */}
            </div>
        </div>
    );
};

export default CardDetail;