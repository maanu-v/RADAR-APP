"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VitalCard } from "@/components/dashboard/vital-card"
import { Activity, Droplets, Heart, Thermometer, Wind, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Patient Overview</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and AI-driven risk assessment.
        </p>
      </div>

      {/* Main Risk Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Clinical Fusion Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-20"></span>
                  <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white font-bold text-xl shadow-lg shadow-green-500/20">
                    LOW
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-600">Stable Condition</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    All vital signs are within normal ranges. AI analysis indicates no immediate risks. Continue standard monitoring protocol.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-md">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Urea Agent</p>
                    <p className="text-xs text-muted-foreground">Monitoring kidney function</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-md">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Fluid Agent</p>
                    <p className="text-xs text-muted-foreground">Monitoring hydration levels</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 text-red-500 rounded-md">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Cardiac Agent</p>
                    <p className="text-xs text-muted-foreground">Monitoring heart rhythm</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Vitals Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Live Sensor Data</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <VitalCard 
            title="Urea Level" 
            value="32" 
            unit="mg/dL" 
            icon={<Droplets className="w-4 h-4" />}
            status="normal"
            description="Optimal range (20-40)"
          />
          <VitalCard 
            title="Fluid Status (ECW/TBW)" 
            value="0.38" 
            unit="ratio" 
            icon={<Waves className="w-4 h-4" />}
            status="normal"
            description="Normal hydration"
          />
          <VitalCard 
            title="Heart Rate" 
            value="72" 
            unit="bpm" 
            icon={<Activity className="w-4 h-4" />}
            status="normal"
            description="Sinus rhythm"
          />
          <VitalCard 
            title="SpO2" 
            value="98" 
            unit="%" 
            icon={<Wind className="w-4 h-4" />}
            status="normal"
            description="Excellent oxygenation"
          />
        </div>
      </div>
    </div>
  )
}

function Waves({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
    )
}
