import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/ui/header';
import { SessionProvider } from "@/app/provider"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZyCardes',
  description: 'Online Pokemon TCG Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
    }
) {
  return (
      <html lang="en">
          
          <body className={inter.className}>
              <SessionProvider>
              <Header />
                  {children}
              </SessionProvider>
          </body>
    </html>
  )
}
