"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, FileText, Server, Send, Wifi, Zap, Shield, Globe } from "lucide-react"

export const PeeringPage = () => {
  const handlePeeringRequestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log("Peering Request Submitted:", data)
    alert("Peering request submitted! We will get back to you soon.")
    event.currentTarget.reset()
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 text-yellow-500 mr-4">
                <Server className="w-12 h-12" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900">Network Peering</CardTitle>
            </div>
            <CardDescription className="text-lg sm:text-xl text-gray-600">
              Establish direct peering connections with TCYP network infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
                <TabsTrigger value="benefits" className="py-3 text-sm sm:text-base">
                  <Info className="w-4 h-4 mr-2" />
                  Benefits
                </TabsTrigger>
                <TabsTrigger value="request" className="py-3 text-sm sm:text-base">
                  <Send className="w-4 h-4 mr-2" />
                  Request Peering
                </TabsTrigger>
                <TabsTrigger value="config" className="py-3 text-sm sm:text-base">
                  <Server className="w-4 h-4 mr-2" />
                  Configuration Guide
                </TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="p-1">
                <div className="space-y-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Peering Benefits</h3>
                    <div className="space-y-4">
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
                  </div>

                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-8">Supported Protocols</h3>
                    <div className="space-y-4">
                      {[
                        { icon: Server, text: "SIP (Session Initiation Protocol)" },
                        { icon: Server, text: "H.323 Protocol Suite" },
                        { icon: Wifi, text: "WebRTC Direct Connections" },
                        { icon: Zap, text: "Bitcoin Lightning Network" },
                      ].map((protocol, index) => (
                        <div key={index} className="flex items-center">
                          <protocol.icon className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{protocol.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          For detailed technical specifications and our peering policy, please refer to our Peering
                          Policy PDF. (Placeholder: Link to PDF will be here).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="request" className="p-1">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Submit a Peering Request</h3>
                <form onSubmit={handlePeeringRequestSubmit} className="space-y-6 max-w-lg mx-auto">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input id="name" name="name" type="text" placeholder="Your Full Name" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="organization" className="text-gray-700">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Your Company/Organization"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="asn" className="text-gray-700">
                      Your ASN (Autonomous System Number)
                    </Label>
                    <Input id="asn" name="asn" type="number" placeholder="e.g., 64500" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="noc_contact" className="text-gray-700">
                      NOC Contact (Email or Phone)
                    </Label>
                    <Input
                      id="noc_contact"
                      name="noc_contact"
                      type="text"
                      placeholder="NOC Contact Information"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="peering_locations" className="text-gray-700">
                      Preferred Peering Location(s)
                    </Label>
                    <Input
                      id="peering_locations"
                      name="peering_locations"
                      type="text"
                      placeholder="e.g., Equinix Ashburn, CoreSite LA1"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimated_traffic" className="text-gray-700">
                      Estimated Traffic (Gbps)
                    </Label>
                    <Input
                      id="estimated_traffic"
                      name="estimated_traffic"
                      type="text"
                      placeholder="e.g., 10 Gbps"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700">
                      Additional Information
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Any additional details or specific requests."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Peering Request
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="config" className="p-1">
                <div className="space-y-6 text-gray-700">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Peering Configuration Guide</h3>
                  <p>
                    To establish a peering session with TCYP, please configure your routers according to the details
                    below. We support BGPv4 for peering.
                  </p>
                  <div className="p-4 border rounded-lg bg-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">TCYP Peering Information:</h4>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>
                        <strong>Our ASN:</strong> 65000 (Example ASN)
                      </li>
                      <li>
                        <strong>MD5 Authentication:</strong> Supported and Recommended
                      </li>
                      <li>
                        <strong>Multiprotocol BGP (MP-BGP):</strong> Supported for IPv4 and IPv6
                      </li>
                      <li>
                        <strong>Max Prefixes:</strong> We announce approximately X prefixes for IPv4 and Y for IPv6.
                        Please set your max-prefix limits accordingly.
                      </li>
                    </ul>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    East Coast Peering Point (e.g., Ashburn, VA)
                  </h4>
                  <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
                    <code>
                      {`! Example Cisco IOS Router Configuration (East Coast)
router bgp 65000 ! Our ASN
 neighbor YOUR_PEER_IP remote-as YOUR_ASN
 neighbor YOUR_PEER_IP description TCYP Peering - East
 neighbor YOUR_PEER_IP password YOUR_MD5_KEY
 !
 address-family ipv4
  neighbor YOUR_PEER_IP activate
  neighbor YOUR_PEER_IP route-map TCYP-IN in
  neighbor YOUR_PEER_IP route-map TCYP-OUT out
 exit-address-family`}
                    </code>
                  </pre>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    West Coast Peering Point (e.g., Los Angeles, CA)
                  </h4>
                  <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
                    <code>
                      {`! Example Juniper Junos Router Configuration (West Coast)
protocols {
    bgp {
        group tCYP-peering-west {
            type external;
            neighbor YOUR_PEER_IP {
                description "TCYP Peering - West";
                peer-as YOUR_ASN;
                authentication-key "$9$YOUR_MD5_KEY_JUNOS_FORMAT"; // Example
            }
        }
    }
}`}
                    </code>
                  </pre>
                  <p className="mt-4">
                    For any questions or assistance with configuration, please contact our NOC at{" "}
                    <a href="mailto:noc@tcyp.example.com" className="text-yellow-600 hover:underline">
                      noc@tcyp.example.com
                    </a>{" "}
                    (Placeholder Email).
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
