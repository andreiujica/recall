"use client"

import * as React from "react"
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from "../lib/tanstack"

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
} 