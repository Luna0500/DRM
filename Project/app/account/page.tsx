import heropic from '@/public/zygardehero.jpg'
import Image from 'next/image'
import DeleteAccountButton from '@/app/ui/deleteAccountButton';
import { getServerSession } from 'next-auth';
export default async function Page() { 
    const session = await getServerSession();
    const userEmail = session?.user?.email || ''
    if (!session) {
        return (
            <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24 ">
                <h1 className="text-5xl text-black">You must be logged in to view your account.</h1>
            </main>
        );
    }
    return (
        <main className="colorbg flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl text-black">Welcome to your account</h1>
            <a href="/userlistings">
                <button className="userlistings-button bg-green-700 hover:bg-green-800">
                    Your Listings!
                </button>
            </a>
            <DeleteAccountButton userEmail={userEmail} />
        </main>
    )
}
