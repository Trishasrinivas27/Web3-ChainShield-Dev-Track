import { useEffect, useRef, useState } from "react";
import { Globe, ShieldCheck, Chrome } from "lucide-react";

const blocks = [
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Seamlessly analyze contracts across ETH, BSC, Polygon, Arbitrum, and more networks with a single click.",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description: "Advanced AI combined with static analysis and behavioral simulation for comprehensive threat detection.",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    icon: Chrome,
    title: "One-Click Chrome Extension",
    description: "Scan contracts directly from any site. No manual address copying needed - just one click protection.",
    gradient: "from-primary/20 to-accent/20",
  },
];

export function AdditionalBlocks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="scanner" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <div
                key={block.title}
                className={`group relative rounded-3xl p-8 overflow-hidden transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                <div className="absolute inset-0 glass" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-foreground">
                    {block.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {block.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-3xl transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
