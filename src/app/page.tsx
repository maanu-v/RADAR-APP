import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, ShieldCheck, Cpu, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full">
               <Image 
                src="/logo.png" 
                alt="RADAR Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">RADAR</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#technology" className="hover:text-foreground transition-colors">Technology</Link>
            <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="gap-2">
                Sign Up <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="flex w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Next-Gen Renal Analytics
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Renal Analytics & Dialysis <br className="hidden md:block" />
              <span className="text-primary">Alert Response Ecosystem</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              A comprehensive multi-agent platform for real-time monitoring, AI-driven risk assessment, and proactive healthcare intervention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Link href="/auth/login">
                <Button size="lg" className="h-12 px-8 text-base">
                  Login to Portal
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Advanced Monitoring Capabilities</h2>
              <p className="text-muted-foreground">
                RADAR integrates data from multiple biosensors to provide a holistic view of patient health.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Activity className="w-10 h-10 text-blue-500" />}
                title="Real-time Vitals"
                description="Continuous monitoring of ECG, SpO2, and Heart Rate with millisecond precision."
              />
              <FeatureCard 
                icon={<Cpu className="w-10 h-10 text-purple-500" />}
                title="AI Fusion Engine"
                description="Multi-agent LLM system that analyzes sensor data to detect anomalies and predict risks."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
                title="Proactive Alerts"
                description="Instant notifications for critical thresholds with actionable medical insights."
              />
            </div>
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="py-20 border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Stat number="99.9%" label="Uptime Reliability" />
              <Stat number="<1s" label="Latency" />
              <Stat number="3" label="Specialist Agents" />
              <Stat number="24/7" label="Continuous Monitoring" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 overflow-hidden rounded-full grayscale opacity-70">
               <Image 
                src="/logo.png" 
                alt="RADAR Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">RADAR System</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RADAR Healthcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
      <div className="mb-4 p-3 rounded-xl bg-background w-fit border border-border/50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Stat({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{number}</div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}
