"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Shield, Bitcoin, MessageSquare } from "lucide-react"

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: { icon: React.ElementType; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <Icon className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const SearchBar = () => (
  <div className="max-w-2xl mx-auto">
    <div className="flex shadow-lg rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Search for businesses..."
        className="flex-1 px-6 py-4 border-0 focus:outline-none"
      />
      <button className="bg-yellow-500 px-6 py-4 text-white hover:bg-yellow-600">
        <Search className="h-6 w-6" />
      </button>
    </div>
  </div>
)

export function TCYPHomePage() {
  const features = [
    {
      icon: MessageSquare,
      title: "Truthful Reviews",
      description: "Uncensored peer-verified reviews from actual customers and businesses",
    },
    {
      icon: Search,
      title: "Easy Discovery",
      description: "Find trusted businesses quickly and efficiently",
    },
    {
      icon: Bitcoin,
      title: "Bitcoin Native",
      description: "Built on Bitcoin's timechain for maximum security and trust",
    },
    {
      icon: Shield,
      title: "Spam Protected",
      description: "Ordinals token-gating ensures only verified businesses can list",
    },
  ]

  const [blockHeight, setBlockHeight] = useState<number | null>(null)

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch("https://mempool.space/api/blocks/tip/height")
        const height = await response.text()
        setBlockHeight(Number.parseInt(height))
      } catch (error) {
        console.error("Failed to fetch block height:", error)
        setBlockHeight(null)
      }
    }

    fetchBlockHeight()
    const interval = setInterval(fetchBlockHeight, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Timechain Yellow Pages</h1>
          <div className="mb-6">
            <div className="text-6xl sm:text-7xl font-bold text-yellow-500 font-mono">
              {blockHeight ? blockHeight.toLocaleString().padStart(6, "0") : "------"}
            </div>
            <p className="text-sm text-gray-500 mt-2">Current Bitcoin Block Height</p>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Spam-free business directory secured by Bitcoin Ordinals
          </p>
          <SearchBar />
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { TCYPHomePage as HomePage }
