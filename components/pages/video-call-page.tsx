"use client"

import { useRef, useEffect, useState } from "react"
import { Video } from "lucide-react"

export function VideoCallPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const [videoError, setVideoError] = useState<string | null>(null)

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          })
          setVideoStream(stream)
          if (videoRef.current) videoRef.current.srcObject = stream
        } catch (err: any) {
          console.error("Error accessing camera:", err)
          switch (err?.name) {
            case "NotAllowedError":
              setVideoError("Camera access denied. Please grant permission in your browser settings.")
              break
            case "NotFoundError":
              setVideoError("No camera found. Please ensure a camera is connected and enabled.")
              break
            default:
              setVideoError(`Could not access camera: ${err.message}`)
          }
        }
      } else {
        setVideoError("Camera access is not supported by your browser or environment.")
      }
    }

    startCamera()
    return () => {
      videoStream?.getTracks().forEach((t) => t.stop())
    }
  }, [videoStream])

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Live Video Feed</h2>

          {videoError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Camera Error</p>
              <p>{videoError}</p>
            </div>
          )}

          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 relative">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {!videoStream && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                <p>Starting camera...</p>
              </div>
            )}
          </div>

          <button
            onClick={() =>
              alert(
                videoStream
                  ? "Connect and Start Video Call (logic to be implemented)"
                  : videoError
                    ? "Cannot start call due to camera error."
                    : "Camera not yet available.",
              )
            }
            className="w-full sm:w-auto bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-medium text-lg flex items-center justify-center space-x-2"
            disabled={!!videoError && !videoStream}
          >
            <Video className="h-5 w-5" />
            <span>Connect and Start Video Call</span>
          </button>
        </div>
      </div>
    </div>
  )
}
