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
                <Image src={logo} alt="logo" className="w-16 h-16" />
            </a>
          
            <div className="flex justify-center 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:trasform 2xl:-translate-x-1/2 2xl:-translate-y-1/2 items-center">
                <HomeSearch placeholder="Search..." />
            </div> 

            <div className="flex justify-self-end items-center">
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
                        <p>Signed in as {userEmail + "- -"}</p>
                        <button className="topbar-buttons " onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                        <button className="topbar-buttons " onClick={() => signIn("GitHub")}>Sign in</button>
                )}
            </div>
        </div>
    )
}