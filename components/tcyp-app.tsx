"use client"

import { WalletProvider } from "@/contexts/wallet-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HomePage } from "@/components/pages/home-page"

export function TCYPApp() {
  return (
    <WalletProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HomePage />
        </main>
        <Footer />
      </div>
    </WalletProvider>
  )
}
