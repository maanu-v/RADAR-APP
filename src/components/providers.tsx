"use client"

import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="radar-theme"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
