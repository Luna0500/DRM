import heropic from '@/public/zygardehero.jpg'
import Image from 'next/image'
export default function Page() { 

    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">This is your account!</h1>
            <div className="bg-white border border-black p-4 mb-8">
            <button className="bg-red-700 hover:bg-red-800 text-2xl">              
                Delete Account
                </button>
            </div>
        </main>
    )
}
