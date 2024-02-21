import Image from 'next/image';
import fs from 'fs';
import Search from '@/app/ui/search';
import { fetchCardsByName } from '@/app/lib/data';
import CardDetail from '@/app/ui/carddetail/carddetails';

import { useRouter } from 'next/router';

import { fetchCards } from '@/app/lib/data'; // You may need to implement this function
import { CardDetailProps } from '@/app/ui/carddetail/carddetails';


const CardDetailPage = ({ cardDetails }: CardDetailProps) => {
    const router = useRouter();
    const { id } = router.query;

    // Fetch card details based on the card ID
    const fetchCardDetails = async () => {
        try {
            const details = await fetchCardsByName(id as string); // Implement this function to fetch details by ID
            return details;
        } catch (error) {
            console.error('Error fetching card details:', error);
            return null;
        }
    };

    return (
        <div>
            <h1>Card Detail Page</h1>
            {cardDetails ? (
                <CardDetail cardDetails={cardDetails} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CardDetailPage;