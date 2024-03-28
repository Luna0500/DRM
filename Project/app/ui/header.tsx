'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import '@/app/globals.css'
import Image from 'next/image';
import logo from '@/public/logo_by_jormxdos.png';
import '@/app/cardlist/homePage.css'
import HomeSearch from '@/app/ui/homeSearch'

export default function Header() {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-24 bg-[#3d3937] text-white px-8 z-30">
            <a href="/" className="mr-4">
                <Image src={logo} alt="logo" className="w-16 h-16 justify-start" />
            </a>
          
            <div className="flex  items-center">
                <HomeSearch placeholder="Search..." />
            </div> 

            <div className="flex items-center">
                <a href="/" className="topbar-buttons mr-4">
                    Home
                </a>
                <a href="/cardlist" className="topbar-buttons  mr-4 ">
                    Cards
                </a>
                <a href="/createlisting" className="topbar-buttons mr-4 ">
                    New Listing
                </a>
                {status === "authenticated" ? (
                    <>
                        <p className="topbar-buttons">Signed in as {userEmail + "- -"}</p>
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                        <button className="topbar-buttons justify-end" onClick={() => signIn("GitHub")}>Sign in</button>
                )}
            </div>
        </div>
    )
}