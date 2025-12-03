"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}>({
  expanded: true,
  setExpanded: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  return React.useContext(SidebarContext)
}

export function SidebarTrigger() {
  const { expanded, setExpanded } = useSidebarContext()
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setExpanded(!expanded)}
      className="md:hidden"
    >
      <PanelLeft className="h-5 w-5" />
    </Button>
  )
}
