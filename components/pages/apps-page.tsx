"use client"

import type React from "react"

import {
  Store,
  Smartphone,
  Download,
  Lock,
  Shield,
  Globe,
  Bitcoin,
  MessageSquare,
  Clock,
  Phone,
  Wifi,
} from "lucide-react"

const GridBox = ({
  icon: Icon,
  title,
  description,
  highlight,
  action,
  color = "yellow",
  className = "",
}: {
  icon: React.ElementType
  title: string
  description: string
  highlight?: boolean
  action?: { text: string; icon?: React.ElementType }
  color?: string
  className?: string
}) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ${highlight ? "border-2 border-yellow-500" : ""} ${className}`}
  >
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <Icon className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
      {action && (
        <div className="mt-auto">
          <button
            className={`w-full bg-${color}-500 text-white py-3 px-4 rounded-lg hover:bg-${color}-600 transition-colors flex items-center justify-center`}
          >
            {action.icon && <action.icon className="h-5 w-5 mr-2" />}
            {action.text}
          </button>
        </div>
      )}
    </div>
  </div>
)

export const AppsPage = () => {
  const downloadApps = [
    {
      icon: Store,
      title: "iOS App",
      description: "Download for iPhone and iPad (iOS 14.0+)",
      action: { text: "Get on App Store", icon: Download },
      color: "gray",
    },
    {
      icon: Smartphone,
      title: "Android App",
      description: "Available for Android 8.0 and above",
      action: { text: "Get on Play Store", icon: Download },
      color: "green",
    },
  ]
  const features = [
    {
      icon: Lock,
      title: "Ordinal Identity",
      description: "Your inscribed phone number becomes your secure, permanent digital identity",
    },
    { icon: Shield, title: "Secure P2P", description: "End-to-end encrypted calls between TCYP users at no cost" },
    { icon: Globe, title: "Global Network", description: "Make calls to any traditional phone number worldwide" },
    {
      icon: Bitcoin,
      title: "Bitcoin Native",
      description: "Top up your calling credit with Bitcoin or Lightning Network",
    },
    {
      icon: MessageSquare,
      title: "Voice Messages",
      description: "Send encrypted voice messages to other TCYP users at no cost",
    },
    { icon: Clock, title: "No Expiry", description: "Your purchased minutes never expire - use them anytime" },
  ]
  const callingPlans = [
    {
      icon: Phone,
      title: "100 Minute Pack",
      description: "Perfect for light callers. Minutes never expire",
      action: { text: "Buy for 0.001 BTC", icon: Bitcoin },
    },
    {
      icon: Phone,
      title: "500 Minute Pack",
      description: "Most popular pack for regular callers",
      action: { text: "Buy for 0.004 BTC", icon: Bitcoin },
      highlight: true,
    },
    {
      icon: Phone,
      title: "1000 Minute Pack",
      description: "Best value for heavy users",
      action: { text: "Buy for 0.007 BTC", icon: Bitcoin },
    },
    {
      icon: Wifi,
      title: "P2P Calls",
      description: "Call any TCYP user for free, forever",
      action: { text: "Always Free", icon: Shield },
    },
  ]
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">TCYP Mobile Apps</h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Make secure calls using Bitcoin and your ordinal phone number
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8">Download TCYP</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {downloadApps.map((app, index) => (
            <GridBox
              key={index}
              {...app}
              className={app.color === "gray" ? "bg-white" : "bg-white"}
              color={app.color}
            />
          ))}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <GridBox key={index} {...feature} />
          ))}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8">Metered Calling Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {callingPlans.map((plan, index) => (
            <GridBox key={index} {...plan} />
          ))}
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-700 mb-2">Security First</h4>
              <p className="text-sm text-yellow-600">
                Your ordinal phone number acts as your secure identity. All peer-to-peer calls between TCYP users are
                end-to-end encrypted and free forever. For traditional phone calls, purchase minutes that never expire
                using Bitcoin or Lightning Network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
