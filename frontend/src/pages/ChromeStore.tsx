import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, ExternalLink, Mail, Flag, ChevronDown, ChevronUp, Check } from "lucide-react";
import chainshieldLogo from "@/assets/chainshield-logo.png";
import screenshotDashboard from "@/assets/screenshot-dashboard.png";
import screenshotPopup from "@/assets/screenshot-popup.png";
import screenshotRugpull from "@/assets/screenshot-rugpull.png";
import screenshotHoneypot from "@/assets/screenshot-honeypot.png";

const screenshots = [
  { src: screenshotDashboard, alt: "ChainShield Dashboard" },
  { src: screenshotPopup, alt: "Extension Popup" },
  { src: screenshotRugpull, alt: "Rugpull Detection" },
  { src: screenshotHoneypot, alt: "Honeypot Warning" },
];

const relatedExtensions = [
  { name: "CryptoGuard", rating: "4.5", users: "50K+" },
  { name: "SafeToken Analyzer", rating: "4.3", users: "30K+" },
  { name: "Web3Shield", rating: "4.6", users: "80K+" },
  { name: "RugCheck Pro", rating: "4.4", users: "45K+" },
];

const ChromeStore = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Left: Logo and info */}
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-2xl bg-card flex items-center justify-center flex-shrink-0 border border-border">
                <img
                  src={chainshieldLogo}
                  alt="ChainShield"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex-1">
                <h1 className="font-display font-bold text-2xl sm:text-3xl mb-2 text-foreground">
                  ChainShield – Smart Contract Security Scanner
                </h1>
                <p className="text-primary text-sm mb-3">chainshield.io</p>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/50 text-yellow-400/50"}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-medium">4.8</span>
                  <span className="text-muted-foreground text-sm">(12,531 reviews)</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  100K+ users • Productivity
                </p>

                <Button variant="chrome" size="lg" className="mb-2">
                  Add to Chrome
                </Button>
              </div>
            </div>
          </div>

          {/* Screenshot carousel */}
          <div className="mb-12">
            <div className="relative rounded-xl overflow-hidden bg-card border border-border">
              <div className="aspect-video relative">
                <img
                  src={screenshots[currentScreenshot].src}
                  alt={screenshots[currentScreenshot].alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={prevScreenshot}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </div>
              
              {/* Thumbnail dots */}
              <div className="flex justify-center gap-2 py-4">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentScreenshot ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <section className="card-gradient rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-xl mb-4 text-foreground">Overview</h2>
                <div className={`text-muted-foreground leading-relaxed ${showMore ? "" : "line-clamp-4"}`}>
                  <p className="mb-4">
                    ChainShield is your AI-powered smart contract security scanner. Analyze any token instantly for scams, rugpull risks, honeypots, backdoors, and hidden owner permissions.
                  </p>
                  <p className="mb-4">
                    Provides on-click safety checks directly inside your browser. No more copying contract addresses manually – ChainShield automatically detects tokens on supported sites and gives you instant security analysis.
                  </p>
                  {showMore && (
                    <>
                      <p className="mb-4">
                        <strong>Key Features:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Instant contract analysis for ERC-20, ERC-721, and custom tokens</li>
                        <li>Rugpull detection: find hidden owner powers and liquidity drain methods</li>
                        <li>Honeypot analysis: detect tokens that block selling</li>
                        <li>Mint function analysis: identify infinite minting vulnerabilities</li>
                        <li>AI-powered readable reports</li>
                        <li>Multi-chain support: ETH, BSC, Polygon, Arbitrum, and more</li>
                      </ul>
                      <p>
                        Stay safe in the DeFi space with ChainShield – your trusted guardian against smart contract threats.
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                >
                  {showMore ? "See less" : "See more"}
                  {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </section>

              {/* Privacy section */}
              <section className="card-gradient rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-xl mb-4 text-foreground">Privacy practices</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  ChainShield has disclosed the following information about the collection and use of your data:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-medium text-foreground mb-2">ChainShield handles the following:</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• User activity (for analytics)</li>
                      <li>• Website content analysis</li>
                      <li>• Contract addresses scanned</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">This developer declares that your data is:</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Not being sold to third parties</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Not being used for purposes unrelated to the extension's core functionality</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Not being used to determine creditworthiness or for lending purposes</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Details */}
              <section className="card-gradient rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-4 text-foreground">Details</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Version</dt>
                    <dd className="text-foreground">1.0.3</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Updated</dt>
                    <dd className="text-foreground">December 5, 2025</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Size</dt>
                    <dd className="text-foreground">18.5MiB</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Languages</dt>
                    <dd className="text-foreground">36 languages</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Developer</dt>
                    <dd className="text-foreground">ChainShield Labs</dd>
                  </div>
                </dl>
                
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <a href="#" className="flex items-center gap-2 text-primary text-sm hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                  <a href="#" className="flex items-center gap-2 text-primary text-sm hover:underline">
                    <Mail className="w-4 h-4" />
                    support@chainshield.io
                  </a>
                </div>
              </section>

              {/* Support */}
              <section className="card-gradient rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-4 text-foreground">Support</h2>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-primary text-sm hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    Visit support site
                  </a>
                  <a href="#" className="flex items-center gap-2 text-primary text-sm hover:underline">
                    <Flag className="w-4 h-4" />
                    Report an issue
                  </a>
                </div>
              </section>

              {/* Related extensions */}
              <section className="card-gradient rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-4 text-foreground">Related extensions</h2>
                <div className="space-y-4">
                  {relatedExtensions.map((ext) => (
                    <div key={ext.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <div className="w-6 h-6 rounded bg-primary/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">{ext.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{ext.rating}</span>
                          <span>•</span>
                          <span>{ext.users}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChromeStore;
