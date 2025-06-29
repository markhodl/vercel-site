"use client"

import type React from "react"

import { Monitor, Box, Server, Archive, Download, Terminal } from "lucide-react"

type DownloadItem = {
  title: string
  icon: React.ElementType
  description: string
  size: string
  version: string
  filename: string
}

export function DownloadPage() {
  const downloads: DownloadItem[] = [
    {
      title: "VMware Image",
      icon: Monitor,
      description: "Pre-configured VMware virtual machine.",
      size: "2.1 GB",
      version: "1.0.0",
      filename: "tcyp-vmware-1.0.0.ova",
    },
    {
      title: "ISO Image",
      icon: Box,
      description: "Bootable ISO for fresh installations.",
      size: "1.8 GB",
      version: "1.0.0",
      filename: "tcyp-1.0.0.iso",
    },
    {
      title: "Hyper-V Image",
      icon: Server,
      description: "Ready-to-import Hyper-V virtual machine.",
      size: "2.0 GB",
      version: "1.0.0",
      filename: "tcyp-hyperv-1.0.0.vhdx",
    },
    {
      title: "Source Code",
      icon: Archive,
      description: "Complete source code with build instructions.",
      size: "156 MB",
      version: "1.0.0",
      filename: "tcyp-1.0.0.tar.gz",
    },
  ]

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Download TCYP Node</h1>
          <p className="text-lg sm:text-xl text-gray-600">Choose your preferred installation method.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {downloads.map(({ icon: Icon, ...d }) => (
            <div
              key={d.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Icon className="h-8 w-8 text-yellow-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-800">{d.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{d.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Version {d.version}</span>
                  <span>{d.size}</span>
                </div>
              </div>
              <div className="bg-gray-50 border-t border-gray-200">
                <button className="w-full px-6 py-3 flex items-center justify-center space-x-2 text-yellow-600 hover:bg-yellow-100 transition-colors duration-200 font-medium">
                  <Download className="h-5 w-5" />
                  <span>Download {d.filename}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 text-gray-200 rounded-lg p-6 shadow-xl">
          <div className="flex items-start space-x-4">
            <Terminal className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3 text-lg">Quick Start with Source</h4>
              <pre className="bg-black bg-opacity-50 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                {`wget https://tcyp.network/downloads/tcyp-1.0.0.tar.gz
tar xzf tcyp-1.0.0.tar.gz
cd tcyp-1.0.0
./configure && make && sudo make install`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
