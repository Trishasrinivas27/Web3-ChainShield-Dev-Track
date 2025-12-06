import { useRef, useEffect, useState } from "react";
import chainshieldLogo from "@/assets/chainshield-logo.png";

export function HeroAnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;
      
      setRotation({
        x: -deltaY,
        y: deltaX,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 perspective-1000"
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
        <div className="absolute w-3/4 h-3/4 rounded-full bg-accent/20 blur-2xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute w-1/2 h-1/2 rounded-full bg-primary/30 blur-xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Main logo container */}
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Shadow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-8 bg-primary/20 rounded-full blur-2xl translate-y-40" />
        </div>

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center animate-float">
          <img
            src={chainshieldLogo}
            alt="ChainShield Lion Logo"
            className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 40px hsl(217 91% 60% / 0.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
