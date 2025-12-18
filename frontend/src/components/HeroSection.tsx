import { Button } from "@/components/ui/button";
import { HeroAnimatedLogo } from "./HeroAnimatedLogo";
import { ArrowRight, Shield } from "lucide-react";

export function HeroSection() {
  const handleAddExtension = () => {
    // Open your GitHub repo where the extension is released
    window.open("https://github.com/Trishasrinivas27/Web3-ChainShield-Dev-Track", "_blank");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="floating-shape w-96 h-96 bg-primary/10 top-20 -left-48 blur-3xl" />
        <div className="floating-shape-delayed w-80 h-80 bg-accent/10 top-40 right-0 blur-3xl" />
        <div
          className="floating-shape w-64 h-64 bg-primary/15 bottom-20 left-1/4 blur-2xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="floating-shape-delayed w-72 h-72 bg-accent/10 bottom-40 right-1/4 blur-3xl"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-down">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            AI-Powered Smart Contract Security
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 animate-slide-up leading-tight">
          <span className="text-gradient">THE AI SECURITY</span>
          <br />
          <span className="text-foreground">ENGINE FOR WEB3</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Instantly detect scams, rugpulls, honeypots, and vulnerabilities on any smart contract.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button variant="hero" size="xl" onClick={handleAddExtension}>
            Add ChainShield Extension
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <a href="/#scanner">
            <Button variant="hero-outline" size="xl">
              Open Scanner
            </Button>
          </a>
        </div>

        {/* Animated Logo */}
        <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <HeroAnimatedLogo />
        </div>
      </div>
    </section>
  );
}
