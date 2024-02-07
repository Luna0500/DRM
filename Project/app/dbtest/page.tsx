import { fetchCards } from '@/app/lib/data';
import Image from 'next/image';
import '../cardlist/homePage.css';

export default async function Page() {
    /*
    const exampleCard = await fetchCards();
    
    return (
        <h1>{JSON.stringify(exampleCard)}</h1>
    )
    
    return (
        <div>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">
                <div className="card">
                    <Image
                        className="relative"
                        src={exampleCard[0].data.images.small}
                        alt={`Image`}
                        width={180}
                        height={37}
                        priority
                    />
                    <p className="title">{exampleCard[0].data.name}</p>
                    <div className="buttons">
                        <button className="buy-now">Buy Now</button>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
    */
   return <h1>Nonfunctional</h1>
}