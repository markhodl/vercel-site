"use client"

import { MessageSquare, Shield } from "lucide-react"

export function MatrixChatPage() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 mr-3" />
              <h2 className="text-2xl sm:text-3xl font-bold">Secure Chat &amp; Gossip Network</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600">
              Private channels for verified peers and exclusive gossip networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Private Chat Channels</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Gossip Hotlines",
                    badge: { text: "Premium", color: "pink" },
                    desc: "Share and receive exclusive information through verified peers.",
                  },
                  {
                    title: "Direct Messaging",
                    badge: { text: "Verified Users", color: "green" },
                    desc: "End-to-end encrypted personal messages.",
                  },
                ].map(({ title, badge, desc }) => (
                  <div key={title} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{title}</span>
                      <span
                        className={`text-xs bg-${badge.color}-100 text-${badge.color}-800 px-2 py-1 rounded-full font-semibold`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Group Channels</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Verified Business Owners",
                    badge: { text: "Business Ordinal", color: "yellow" },
                    desc: "Network with other verified business owners.",
                  },
                  {
                    title: "Community Hub",
                    badge: { text: "Any TCYP Ordinal", color: "blue" },
                    desc: "General discussion and community support.",
                  },
                ].map(({ title, badge, desc }) => (
                  <div key={title} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{title}</span>
                      <span
                        className={`text-xs bg-${badge.color}-100 text-${badge.color}-800 px-2 py-1 rounded-full font-semibold`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Privacy Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
              {["End-to-end encryption", "Self-destructing messages", "Anonymous messaging option"].map((text) => (
                <div key={text} className="flex items-center">
                  <Shield className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-3">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg">
              Connect &amp; Start Chatting
            </button>
            <p className="text-xs text-gray-500">
              Identity verified via Ordinals. Messages remain private &amp; encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
