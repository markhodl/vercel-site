"use client"

import { useState } from "react"
import { Bitcoin, Menu, X } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { key: "home", label: "Search", href: "/" },
  { key: "inscribe", label: "List Business", href: "/inscribe" },
  { key: "market", label: "Market", href: "/market" },
  { key: "apps", label: "Apps", href: "/apps" },
  { key: "agent", label: "AI Agent", href: "/agent" },
  { key: "chat", label: "Matrix Chat", href: "/chat" },
  { key: "phone", label: "Phone Call", href: "/phone" },
  { key: "video", label: "Video Call", href: "/video" },
  { key: "download", label: "Download", href: "/download" },
  { key: "peering", label: "Peering", href: "/peering" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { connectWallet, isConnected } = useWallet()

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <a href="/" className="flex items-center space-x-2 cursor-pointer flex-shrink-0">
              <Bitcoin className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-500" />
              <span className="text-xl sm:text-2xl font-bold">TCYP</span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-4 md:space-x-6 text-sm sm:text-base">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            onClick={connectWallet}
            className="bg-yellow-500 text-white hover:bg-yellow-600 text-xs sm:text-sm flex-shrink-0"
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <nav className="py-2 flex flex-col">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
