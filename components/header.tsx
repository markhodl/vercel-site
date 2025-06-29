"use client"

import { useState } from "react"
import { Bitcoin, Menu, X } from "lucide-react"

type HeaderProps = {
  currentPage: string
  setCurrentPage: (page: string) => void
  onConnectWallet: () => void
}

export function Header({ currentPage, setCurrentPage, onConnectWallet }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { key: "home", label: "Search" },
    { key: "inscribe", label: "List Business" },
    { key: "market", label: "Market" },
    { key: "apps", label: "Apps" },
    { key: "agent", label: "AI Agent" },
    { key: "chat", label: "Matrix Chat" },
    { key: "phone", label: "Phone Call" },
    { key: "video", label: "Video Call" },
    { key: "download", label: "Download" },
    { key: "peering", label: "Peering" },
  ]

  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false) // Close menu on navigation
  }

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
            <div
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
            >
              <Bitcoin className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-500" />
              <span className="text-xl sm:text-2xl font-bold">TCYP</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-4 md:space-x-6 text-sm sm:text-base">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 ${
                  currentPage === item.key ? "font-semibold text-yellow-600" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={onConnectWallet}
            className="bg-yellow-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-600 text-xs sm:text-sm transition-colors flex-shrink-0"
          >
            Connect Wallet
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <nav className="py-2 flex flex-col">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                    currentPage === item.key
                      ? "bg-yellow-50 text-yellow-600 font-semibold border-r-4 border-yellow-500"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
