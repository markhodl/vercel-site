"use client"

import { useState } from "react"
import { Phone } from "lucide-react"

export const PhoneCallPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber((prev) => prev + num)
    }
  }

  const handleDial = () => {
    if (isConnected) {
      console.log("Dialing:", phoneNumber)
    }
  }

  const KeypadButton = ({ value, onClick }: { value: string; onClick: (value: string) => void }) => (
    <button
      onClick={() => onClick(value)}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 rounded-lg shadow transition-colors text-xl"
    >
      {value}
    </button>
  )

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <Phone className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold">Secure Phone Call</h2>
          </div>

          <p className="text-gray-600 mb-6 text-center">Make encrypted phone calls through the Bitcoin timechain</p>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-2xl text-center font-mono mb-6 h-16 flex items-center justify-center">
            {phoneNumber || "Enter Number"}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((num) => (
              <KeypadButton key={num} value={num} onClick={handleNumberClick} />
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleDial}
              disabled={!isConnected || !phoneNumber}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center space-x-2 ${
                isConnected && phoneNumber ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <Phone className="h-5 w-5" />
              <span>DIAL</span>
            </button>
            <button
              onClick={() => setIsConnected(!isConnected)}
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 font-medium flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>{isConnected ? "Disconnect Service" : "Connect Service"}</span>
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {isConnected
                ? "Connected to secure phone service."
                : "Connect service to make peer-to-peer encrypted calls."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { PhoneCallPage as PhonePage }
