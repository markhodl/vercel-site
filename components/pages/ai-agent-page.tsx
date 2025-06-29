"use client"

import { Bitcoin, Shield } from "lucide-react"

export function AIAgentPage() {
  return (
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
}

export { AIAgentPage as AiAgentPage }
