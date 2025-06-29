"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { AddressPurpose, BitcoinNetworkType, getAddress, getCapabilities } from "sats-connect"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface WalletState {
  paymentAddress?: string
  paymentPublicKey?: string
  ordinalsAddress?: string
  ordinalsPublicKey?: string
  stacksAddress?: string
  stacksPublicKey?: string
  network: BitcoinNetworkType
  isConnected: boolean
}

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>
  setNetwork: (network: BitcoinNetworkType) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [paymentAddress, setPaymentAddress] = useLocalStorage<string>("paymentAddress")
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage<string>("paymentPublicKey")
  const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage<string>("ordinalsAddress")
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useLocalStorage<string>("ordinalsPublicKey")
  const [stacksAddress, setStacksAddress] = useLocalStorage<string>("stacksAddress")
  const [stacksPublicKey, setStacksPublicKey] = useLocalStorage<string>("stacksPublicKey")
  const [network, setNetwork] = useLocalStorage<BitcoinNetworkType>("network", BitcoinNetworkType.Mainnet)

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsConnected(!!(paymentAddress && ordinalsAddress))
  }, [paymentAddress, ordinalsAddress])

  useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0
      const MAX_RUNS = 20
      if (typeof window === "undefined") return

      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response) {
              // Capabilities loaded
            },
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

  const connectWallet = async () => {
    if (typeof window === "undefined") {
      alert("Wallet operations can only be performed in the browser.")
      return
    }

    try {
      await getCapabilities({
        onFinish(response) {
          performWalletConnection()
        },
        onCancel() {
          console.warn("Capability check cancelled by wallet.")
        },
        payload: { network: { type: network } },
      })
    } catch (error) {
      window.open("https://www.xverse.app/download", "_blank")
      return
    }
  }

  const performWalletConnection = async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: "SATS Connect Demo for TCYP",
        network: { type: network },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Payment)
        setPaymentAddress(paymentAddressItem?.address)
        setPaymentPublicKey(paymentAddressItem?.publicKey)

        const ordinalsAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Ordinals)
        setOrdinalsAddress(ordinalsAddressItem?.address)
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey)

        const stacksAddressItem = response.addresses.find((addr) => addr.purpose === AddressPurpose.Stacks)
        setStacksAddress(stacksAddressItem?.address)
        setStacksPublicKey(stacksAddressItem?.publicKey)

        alert("Wallet Connected! Addresses stored.")
      },
      onCancel: () => alert("Wallet connection request canceled."),
    })
  }

  const value: WalletContextType = {
    paymentAddress,
    paymentPublicKey,
    ordinalsAddress,
    ordinalsPublicKey,
    stacksAddress,
    stacksPublicKey,
    network,
    isConnected,
    connectWallet,
    setNetwork,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
