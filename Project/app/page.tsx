'use client'

import Image from 'next/image'
import HomeSearch from '@/app/ui/homeSearch'
import { useSession, signIn, signOut } from "next-auth/react"
import heropic from '@/public/zygardehero.jpg'
import heropic2 from '@/public/zygardehero2.webp'

export default function Home() {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#daffb5]">
            <div className="border-hp">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-4xl flex text-gray-800">Welcome to ZyCardes</h1>
                        <div className="divide-y">
                            <p className="flex text-gray-800">Welcome to our e-commerce website to buy, view, and sell Pokemon cards. To get started</p>
                            {status === "authenticated" ? (
                                <>
                                    <p className="text-gray-800">Signed in as {userEmail + "- -"}</p>
                                    <button className="flex homesign-in mr-4 text-2xl text-gray-800" onClick={() => signOut()}>Sign out</button>
                                </>
                            ) : (
                                <button className="homesign-in mr-4 text-2xl text-gray-800" onClick={() => signIn("GitHub")}>Sign in</button>
                            )}
                        </div>
                    </div>
                    <Image
                        unoptimized
                        src={heropic2}
                        alt="heropic2"
                        width={850}
                        priority
                        className="flex"
                    />
                </div>
            </div>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                    href="/createlisting"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-gray-800`}>
                        Create Listing{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-800`}>
                        Create a new listing!
                    </p>
                </a>

                <a
                    href="/cardlist"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-gray-800`}>
                        Card List{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-800`}>
                        Check out the cards!
                    </p>
                </a>

                <a
                    href="/cart"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-gray-800`}>
                        Your Cart{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-800`}>
                        View at your cart!
                    </p>
                </a>

                <a
                    href="/account"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-gray-800`}>
                        Account{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-800`}>
                        View your account!
                    </p>
                </a>
                <a
                    href="/orderhistory"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-gray-800`}>
                        Order History{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-800`}>
                       View your order history!
                    </p>
                </a>

            </div>
        </main>
    )
}
