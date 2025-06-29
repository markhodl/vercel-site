"use client"

import type React from "react"

import { useState, useEffect } from "react"

function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key)
    if (saved !== null) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error("Parsing error on", { key, saved })
        return defaultValue
      }
    }
  }
  return defaultValue
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
