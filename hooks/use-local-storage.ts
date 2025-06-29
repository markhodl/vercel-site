"use client"

import { useState, useEffect } from "react"

type SetValue<T> = (value: T | ((prev: T) => T)) => void

export function useLocalStorage<T>(key: string, initialValue?: T): [T, SetValue<T>] {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue as T
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue as T
    }
  })

  // Update localStorage when the state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
