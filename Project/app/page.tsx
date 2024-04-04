'use client'

import Image from 'next/image'
import HomeSearch from '@/app/ui/homeSearch'
import fs from 'fs';
import '@/app/cardlist/homePage.css';
import Search from '@/app/ui/search';
import { fetchCardsByName, fetchCardsByAttack, fetchCardsByHP } from '@/app/lib/data';
import React from 'react';
import heropic from '@/public/zygardehero.jpg'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#daffb5]">
          <div className="border-hp">
              <div className="flex justify-between">
                  <div>  <h1 className="text-4xl flex" >Welcome to Zycardes</h1>
                      <div className="divide-y">
                          <p className="flex">Welcome to our e-commerce website to buy, view and sell cards. To get started click on the button below</p>
                          {status === "authenticated" ? (
                              <>
                                  <p>Signed in as {userEmail + "- -"}</p>
                                  <button className="topbar-buttons mr-4" onClick={() => signOut()}>Sign out</button>
                              </>
                          ) : (
                              <button className="topbar-buttons mr-4" onClick={() => signIn("GitHub")}>Sign in</button>
                          )}
                      </div>
                  </div>            
                  <Image
                      unoptimized
                      src={heropic}
                      alt="heropic"
                      width={850}
                      priority
                      className="flex"
                  />
              </div>    
          </div>                             
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/createlisting"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-gray-500`}>
            Create Listing{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-500`}>
            Create a new listing!
          </p>
        </a>

        <a
          href="/cardlist"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-gray-500`}>
            Card List{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-500`}>
            A card list starter page.
          </p>
        </a>

        <a
            href="/cart"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
            >
          <h2 className={`mb-3 text-2xl font-semibold text-gray-500`}>
            Your Cart{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-500`}>
            Look at your cart!
          </p>
        </a>

      </div>
    </main>
  )
}
