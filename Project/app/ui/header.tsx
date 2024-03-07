'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import '@/app/globals.css'

export default function Header() {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-16 bg-blue-900 text-white px-8 z-30">
            <p className="font-mono text-sm">
                Welcome to DRM Name TBD
            </p>

            <div className="flex items-center">
                <a href="/" className="mr-4">
                    Home
                </a>
                <a href="/cardlist" className="mr-4">
                    Cards
                </a>
                <a href="/createlisting" className="mr-4">
                    New Listing
                </a>
                {status === "authenticated" ? (
                    <>
                        <p>Signed in as {userEmail + "- -"}</p>
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                    <button onClick={() => signIn("GitHub")}>Sign in</button>
                )}
            </div>
        </div>
    )
}