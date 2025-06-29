"use client"

import { useState } from "react"

export function useLocalStorage<T extends string = string>(key: string): [T | undefined, (value: T | undefined) => void]

export function useLocalStorage<T extends string = string>(key: string, initialValue: T): [T, (value: T) => void]

export function useLocalStorage<T extends string = string>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: T | undefined) => void] | [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    // Check if we're on the client side before accessing localStorage
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? (item as T) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | undefined) => {
    try {
      // Save state
      setStoredValue(value)
      // Save to local storage
      if (typeof window !== "undefined") {
        if (value === undefined) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, value)
        }
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
