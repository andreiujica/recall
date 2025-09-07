"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for fetching and managing favicon URLs
 * Uses Google's favicon service with DuckDuckGo as fallback
 */
export function useFavicon(url: string) {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null)
  const [faviconError, setFaviconError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`
    } catch {
      return null
    }
  }

  const getFallbackFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`
    } catch {
      return null
    }
  }

  const handleFaviconError = () => {
    if (!faviconError) {
      // Try fallback favicon service
      const fallbackUrl = getFallbackFaviconUrl(url)
      if (fallbackUrl) {
        setFaviconUrl(fallbackUrl)
        setFaviconError(true)
      } else {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!url) return

    setIsLoading(true)
    setFaviconError(false)
    
    const favicon = getFaviconUrl(url)
    if (favicon) {
      setFaviconUrl(favicon)
    } else {
      setIsLoading(false)
    }
  }, [url])

  return {
    faviconUrl,
    isLoading,
    handleFaviconError,
    faviconError
  }
}
