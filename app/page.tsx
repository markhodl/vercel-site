"use client"

import { useState, useEffect } from "react"
import { AddressPurpose, BitcoinNetworkType, getAddress, getCapabilities } from "sats-connect"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomePage } from "@/components/pages/home-page"
import { PhonePage } from "@/components/pages/phone-page"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { InscriptionPage } from "@/components/pages/inscription-page"
import { MarketPage } from "@/components/pages/market-page"
import { AppsPage } from "@/components/pages/apps-page"
import { AiAgentPage } from "@/components/pages/ai-agent-page"
import { MatrixChatPage } from "@/components/pages/matrix-chat-page"
import { VideoCallPage } from "@/components/pages/video-call-page"
import { DownloadPage } from "@/components/pages/download-page"
import { PeeringPage } from "@/components/pages/peering-page"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [, setPaymentAddress] = useLocalStorage<string>("paymentAddress")
  const [, setPaymentPublicKey] = useLocalStorage<string>("paymentPublicKey")
  const [, setOrdinalsAddress] = useLocalStorage<string>("ordinalsAddress")
  const [, setOrdinalsPublicKey] = useLocalStorage<string>("ordinalsPublicKey")
  const [, setStacksAddress] = useLocalStorage<string>("stacksAddress")
  const [, setStacksPublicKey] = useLocalStorage<string>("stacksPublicKey")
  const [network] = useLocalStorage<BitcoinNetworkType>("network", BitcoinNetworkType.Mainnet)

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

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "inscribe":
        return <InscriptionPage />
      case "market":
        return <MarketPage />
      case "apps":
        return <AppsPage />
      case "agent":
        return <AiAgentPage />
      case "chat":
        return <MatrixChatPage />
      case "phone":
        return <PhonePage />
      case "video":
        return <VideoCallPage />
      case "download":
        return <DownloadPage />
      case "peering":
        return <PeeringPage />
      default:
        return <HomePage />
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
