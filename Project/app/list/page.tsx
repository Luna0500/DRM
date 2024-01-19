import Image from 'next/image';
import * as fs from 'fs';

export default function Page() {
    let rawData = fs.readFileSync('../Project/public/sampleCards.json', 'utf8');
    let jsonDataArray = JSON.parse(rawData);
    const imgArray = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        imgArray[i] = jsonDataArray[i].images.small;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>This the sample list Page!</h1>
            <div className="flex min-h-screen flex-wrap items-center justify-between p-24">

            {imgArray.map((imageSrc, index) => (
                <Image
                    key={index}
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src={imageSrc}
                    alt={`Image ${index}`}
                    width={180}
                    height={37}
                    priority
                />
            ))}
            </div>
        </main>
    );
}