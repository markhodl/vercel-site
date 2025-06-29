"use client"

import { Bitcoin, Phone, Tag, AlertCircle } from "lucide-react"

const MarketCard = ({
  phoneNumber,
  country,
  price,
  seller,
  date,
}: { phoneNumber: string; country: string; price: string; seller: string; date: string }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-yellow-500" />
          <span className="text-lg font-medium">{phoneNumber}</span>
        </div>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{country}</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Listed by {seller}</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Bitcoin className="h-4 w-4 text-yellow-500" />
            <span className="font-bold text-lg">{price} BTC</span>
          </div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
)

export const MarketPage = () => {
  const listings = [
    {
      phoneNumber: "+1 (555) 123-4567",
      country: "United States",
      price: "0.0125",
      seller: "satoshi21",
      date: "2025-01-10",
    },
    {
      phoneNumber: "+44 (020) 7123 4567",
      country: "United Kingdom",
      price: "0.0155",
      seller: "bitcoinmaxi",
      date: "2025-01-11",
    },
    {
      phoneNumber: "+81 (03) 1234-5678",
      country: "Japan",
      price: "0.0145",
      seller: "ordinalenjoyer",
      date: "2025-01-12",
    },
    { phoneNumber: "+49 (030) 1234567", country: "Germany", price: "0.0135", seller: "blocktimer", date: "2025-01-12" },
  ]
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ordinal Phone Number Market</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">Buy and sell unique phone number inscriptions</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button className="flex items-center justify-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
              <Tag className="h-5 w-5" />
              <span>List Your Number</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50">
              <AlertCircle className="h-5 w-5" />
              <span>View My Listings</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto">
                <option>All Countries</option> <option>United States</option> <option>United Kingdom</option>{" "}
                <option>Japan</option> <option>Germany</option>
              </select>
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto">
                <option>Price: Low to High</option> <option>Price: High to Low</option> <option>Newest First</option>{" "}
                <option>Oldest First</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              <span>{listings.length} listings available</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <MarketCard key={index} {...listing} />
          ))}
        </div>
      </div>
    </div>
  )
}
