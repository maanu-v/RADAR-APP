"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Droplets, Heart, Thermometer, Wind, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

interface VitalCardProps {
  title: string
  value: string | number
  unit: string
  icon: React.ReactNode
  trend?: "up" | "down" | "stable"
  status?: "normal" | "warning" | "critical"
  description?: string
}

export function VitalCard({ title, value, unit, icon, status = "normal", description }: VitalCardProps) {
  return (
    <Card className={cn(
      "border-l-4 transition-all hover:shadow-md",
      status === "normal" && "border-l-green-500",
      status === "warning" && "border-l-yellow-500",
      status === "critical" && "border-l-red-500"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-full",
          status === "normal" && "bg-green-500/10 text-green-500",
          status === "warning" && "bg-yellow-500/10 text-yellow-500",
          status === "critical" && "bg-red-500/10 text-red-500 animate-pulse"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
