import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TCYP - Timechain Yellow Pages",
  description: "Spam-free business directory secured by Bitcoin Ordinals. Created by Mark.HODL.",
  icons: {
    icon: "/logo.png",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
