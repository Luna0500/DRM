'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import '@/app/globals.css'
import Image from 'next/image';
import logo from '@/public/logo_by_jormxdos.png';
import '@/app/cardlist/homePage.css'
import HomeSearch from '@/app/ui/homeSearch'
import { useState } from 'react';
export default function Header() {
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-24 bg-[#3d3937] text-white px-8 z-30">
            <a href="/" className="mr-4">
                <Image src={logo} alt="logo" className="w-16 h-16" />
            </a>

            <div className="flex-1 flex justify-center items-center">
                <HomeSearch placeholder="Search..." />
            </div>

            <div className="relative flex-shrink-0">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="topbar-buttons mr-4 focus:outline-none"
                >
                    Menu
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 bg-white mt-2 shadow-lg rounded">
                        <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</a>
                        <a href="/cardlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cards</a>
                        <a href="/createlisting" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">New Listing</a>
                        <a href="/orderhistory" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Order History</a>
                    </div>
                )}
            </div>

            <div className="flex justify-self-end items-center">
                {status === "authenticated" ? (
                    <>
                        <p>Signed in as {userEmail + "- -"}</p>
                        <button className="topbar-buttons mr-4" onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                    <button className="topbar-buttons mr-4" onClick={() => signIn("GitHub")}>Sign in</button>
                )}
                <a href="/cart" className="topbar-buttons mr-4">
                    Cart
                </a>
            </div>
        </div>
    );
}