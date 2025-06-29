"use client"

import { useState, useEffect } from "react"
import { AddressPurpose, BitcoinNetworkType, getAddress, getCapabilities } from "sats-connect"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
  Search,
  Bitcoin,
  MessageSquare,
  Shield,
  Wifi,
  Globe,
  Zap,
  Download,
  Phone,
  Video,
  MessageCircle,
  AppWindow,
  ShoppingCart,
  PenTool,
  User,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [, setPaymentAddress] = useLocalStorage<string>("paymentAddress")
  const [, setPaymentPublicKey] = useLocalStorage<string>("paymentPublicKey")
  const [, setOrdinalsAddress] = useLocalStorage<string>("ordinalsAddress")
  const [, setOrdinalsPublicKey] = useLocalStorage<string>("ordinalsPublicKey")
  const [, setStacksAddress] = useLocalStorage<string>("stacksAddress")
  const [, setStacksPublicKey] = useLocalStorage<string>("stacksPublicKey")
  const [network] = useLocalStorage<BitcoinNetworkType>("network", BitcoinNetworkType.Mainnet)
  const [blockHeight, setBlockHeight] = useState<number | null>(null)

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch("https://mempool.space/api/blocks/tip/height")
        const height = await response.text()
        setBlockHeight(Number.parseInt(height))
      } catch (error) {
        console.error("Failed to fetch block height:", error)
        setBlockHeight(903136) // Fallback height
      }
    }
    fetchBlockHeight()
  }, [])

  useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0
      const MAX_RUNS = 20
      if (typeof window === "undefined") return

      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish() {},
            onCancel() {
              console.warn("Capability check cancelled by wallet.")
            },
            payload: { network: { type: network } },
          })
          break
        } catch (e) {
          runs++
          if (runs === MAX_RUNS) {
            console.error("Could not find an installed Sats Connect capable wallet.")
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
    runCapabilityCheck()
  }, [network])

  const handleConnectWallet = async () => {
    if (typeof window === "undefined") {
      alert("Wallet operations can only be performed in the browser.")
      return
    }

    try {
      await getCapabilities({
        onFinish: () => connectWallet(),
        onCancel: () => console.warn("Capability check cancelled by wallet."),
        payload: { network: { type: network } },
      })
    } catch (error) {
      window.open("https://www.xverse.app/download", "_blank")
    }
  }

  const connectWallet = async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: "SATS Connect Demo for TCYP",
        network: { type: network },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Payment)
        setPaymentAddress(paymentAddressItem?.address || "")
        setPaymentPublicKey(paymentAddressItem?.publicKey || "")

        const ordinalsAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Ordinals)
        setOrdinalsAddress(ordinalsAddressItem?.address || "")
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey || "")

        const stacksAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Stacks)
        setStacksAddress(stacksAddressItem?.address || "")
        setStacksPublicKey(stacksAddressItem?.publicKey || "")

        alert("Wallet Connected! Addresses stored.")
      },
      onCancel: () => alert("Wallet connection request canceled."),
    })
  }

  const renderHomePage = () => (
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
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Truthful Reviews",
                description: "Uncensored peer-verified reviews from actual customers and businesses",
              },
              { icon: Search, title: "Easy Discovery", description: "Find trusted businesses quickly and efficiently" },
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
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderInscriptionPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">List Your Business</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Inscribe your business on the Bitcoin Timechain for immutable presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">How It Works</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Connect your Bitcoin wallet.",
                  "Provide business details and category.",
                  "Pay a small inscription fee in sats.",
                  "Your listing is permanently added to the Bitcoin blockchain.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <PenTool className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Benefits</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Immutable and censorship-resistant listing.",
                  "Global visibility without intermediaries.",
                  "Proof of existence on the most secure blockchain.",
                  "Attract Bitcoin-native customers.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Shield className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Inscribe Your Business
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMarketPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">TCYP Marketplace</h2>
            <p className="text-lg sm:text-xl text-gray-600">Discover and trade Bitcoin Ordinals related to TCYP.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Browse Listings</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Unique Ordinals for businesses.",
                  "Rare TCYP-themed digital collectibles.",
                  "Verified sellers and transparent transactions.",
                  "Filter by category, price, and rarity.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <ShoppingCart className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Sell Your Ordinals</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "List your Bitcoin Ordinals easily.",
                  "Reach a dedicated community of collectors.",
                  "Secure transactions with smart contracts.",
                  "Low fees and fast settlements.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Bitcoin className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Explore Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppsPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">TCYP Apps</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Explore decentralized applications built on the TCYP network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Featured Apps</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Decentralized messaging clients.",
                  "Secure file sharing applications.",
                  "Community governance tools.",
                  "Bitcoin-integrated payment solutions.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <AppWindow className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Developer Resources</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "SDKs and APIs for TCYP integration.",
                  "Documentation and tutorials.",
                  "Community support forums.",
                  "Grants and funding opportunities.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <User className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Discover Apps
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAiAgentPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Your AI Call Assistant</h2>
            <p className="text-lg sm:text-xl text-gray-600">Intelligent call screening powered by advanced AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">How It Works</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "AI agent answers calls on your behalf.",
                  "Analyzes voice patterns and conversation intent.",
                  "Filters out spam and unwanted calls automatically.",
                  "Learns from your preferences over time.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Bitcoin className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Key Features</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Natural voice conversations.",
                  "Real-time spam detection.",
                  "Custom screening rules.",
                  "Detailed call analytics.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Shield className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Activate AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMatrixChatPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Matrix Chat</h2>
            <p className="text-lg sm:text-xl text-gray-600">Secure, decentralized communication powered by Matrix.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Features</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "End-to-end encrypted messaging.",
                  "Decentralized network, no single point of control.",
                  "Rich communication features (voice, video, files).",
                  "Open source and interoperable.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <MessageCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Benefits</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Private and secure conversations.",
                  "Resistant to censorship and surveillance.",
                  "Connect with users across different Matrix clients.",
                  "Community-driven development.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Shield className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Join Matrix Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPhonePage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Decentralized Phone Calls</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Make secure and private voice calls over the decentralized network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">How It Works</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Peer-to-peer connections for direct communication.",
                  "Utilizes WebRTC for real-time audio.",
                  "No central servers, enhanced privacy.",
                  "Integrated with TCYP identity for verified calls.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Phone className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Key Features</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "End-to-end encrypted voice calls.",
                  "High-quality audio.",
                  "Anonymous calling options.",
                  "Spam call protection.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Shield className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Start a Phone Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVideoCallPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Decentralized Video Calls</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Engage in secure and private video conversations over the decentralized network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">How It Works</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Peer-to-peer connections for direct video streaming.",
                  "Utilizes WebRTC for real-time video.",
                  "No central servers, ensuring maximum privacy.",
                  "Secure identity verification via TCYP.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Video className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Key Features</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "End-to-end encrypted video calls.",
                  "High-definition video quality.",
                  "Screen sharing capabilities.",
                  "Group video conferencing.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Shield className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Start a Video Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDownloadPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Download TCYP Apps</h2>
            <p className="text-lg sm:text-xl text-gray-600">Get the official TCYP applications for your devices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Mobile Apps</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Available on iOS and Android.",
                  "Seamless mobile experience.",
                  "Push notifications for calls and messages.",
                  "Optimized for on-the-go use.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Download className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Desktop Clients</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "Compatible with Windows, macOS, and Linux.",
                  "Full-featured desktop experience.",
                  "Multi-monitor support.",
                  "Keyboard shortcuts for efficiency.",
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <Download className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPeeringPage = () => (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <div className="text-white text-xl">⚡</div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Network Peering</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600">
              Establish direct peering connections with TCYP network infrastructure
            </p>
          </div>

          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="benefits">Peering Benefits</TabsTrigger>
              <TabsTrigger value="protocols">Supported Protocols</TabsTrigger>
            </TabsList>
            <TabsContent value="benefits" className="mt-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {[
                  { icon: Wifi, text: "Direct routing for improved call quality" },
                  { icon: Zap, text: "Reduced latency and better performance" },
                  { icon: Shield, text: "Enhanced security through private connections" },
                  { icon: Globe, text: "Global network reach and redundancy" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <benefit.icon className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="protocols" className="mt-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {[
                  { icon: "→", text: "SIP (Session Initiation Protocol)" },
                  { icon: "⚡", text: "H.323 Protocol Suite" },
                  { icon: "📡", text: "WebRTC Direct Connections" },
                  { icon: "⚡", text: "Bitcoin Lightning Network" },
                ].map((protocol, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-yellow-500 mr-3 text-lg">{protocol.icon}</span>
                    <span className="text-gray-700">{protocol.text}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Request Peering
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage()
      case "inscribe":
        return renderInscriptionPage()
      case "market":
        return renderMarketPage()
      case "apps":
        return renderAppsPage()
      case "agent":
        return renderAiAgentPage()
      case "chat":
        return renderMatrixChatPage()
      case "phone":
        return renderPhonePage()
      case "video":
        return renderVideoCallPage()
      case "download":
        return renderDownloadPage()
      case "peering":
        return renderPeeringPage()
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} onConnectWallet={handleConnectWallet} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  )
}
