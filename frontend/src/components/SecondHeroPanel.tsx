import { useEffect, useRef, useState } from "react";
import chainshieldLogo from "@/assets/chainshield-logo.png";

export function SecondHeroPanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-2xl bg-primary/10 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-3xl bg-accent/10 blur-xl animate-float-reverse" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-primary/20 blur-lg animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              <span className="text-gradient">THE EVERYTHING</span>
              <br />
              <span className="text-foreground">SECURITY SCANNER</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              From ERC-20 tokens to complex DeFi protocols, ChainShield analyzes every smart contract with advanced AI and static analysis to keep your investments safe.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Ethereum", "BSC", "Polygon", "Arbitrum", "Optimism"].map((chain, i) => (
                <div
                  key={chain}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {chain}
                </div>
              ))}
            </div>
          </div>

          {/* Visual element */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow effects */}
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl animate-glow-pulse" />
              
              {/* Card container */}
              <div className="relative glass rounded-3xl p-8 h-full flex items-center justify-center animate-tilt-3d">
                <div className="text-center space-y-6">
                  <img
                    src={chainshieldLogo}
                    alt="ChainShield"
                    className="w-32 h-32 mx-auto object-contain animate-float"
                    style={{ filter: "drop-shadow(0 0 30px hsl(217 91% 60% / 0.4))" }}
                  />
                  <div className="space-y-2">
                    <div className="text-4xl font-display font-bold text-gradient">100K+</div>
                    <div className="text-muted-foreground">Contracts Scanned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
