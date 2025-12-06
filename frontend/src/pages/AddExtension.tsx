import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Chrome, Pin, Search, ArrowRight } from "lucide-react";
import chainshieldLogo from "@/assets/chainshield-logo.png";

const steps = [
  {
    icon: Chrome,
    number: "1",
    title: "Click \"Add Extension\"",
    description: "Add ChainShield to Chrome from the Web Store with one click.",
  },
  {
    icon: Pin,
    number: "2", 
    title: "Pin the Extension",
    description: "Click the puzzle icon and pin ChainShield for easy access.",
  },
  {
    icon: Search,
    number: "3",
    title: "Start Scanning",
    description: "Open any token page and click the extension to analyze contracts.",
  },
];

const AddExtension = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-8 animate-float">
              <img
                src={chainshieldLogo}
                alt="ChainShield"
                className="w-16 h-16 object-contain"
                style={{ filter: "drop-shadow(0 0 20px hsl(217 91% 60% / 0.3))" }}
              />
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 animate-slide-up">
              Add <span className="text-gradient">ChainShield</span> Extension
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Install ChainShield in your browser to scan any token smart contract instantly. Protect yourself from scams, rugpulls, and honeypots.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl">
                <Chrome className="w-5 h-5 mr-2" />
                Add Extension
              </Button>
              <Button variant="hero-outline" size="xl">
                Open ChainShield
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative group animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}

                  <div className="relative card-gradient rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 card-shadow">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full button-gradient flex items-center justify-center font-display font-bold text-foreground shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="mt-20 text-center">
            <p className="text-muted-foreground text-sm mb-6">Trusted by thousands of DeFi users</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {["100K+ Downloads", "4.8★ Rating", "24/7 Protection", "Multi-Chain"].map((badge) => (
                <div key={badge} className="px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddExtension;
