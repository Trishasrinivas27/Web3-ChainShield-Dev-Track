import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Loader2, Zap, Lock, Users, Coins } from "lucide-react";

interface ScanResult {
  category: string;
  label: string;
  status: "safe" | "warning" | "danger";
  detail: string;
  icon: React.ReactNode;
}

const mockResults: ScanResult[] = [
  { category: "Ownership", label: "Owner Privileges", status: "warning", detail: "Owner can pause transfers", icon: <Users className="w-4 h-4" /> },
  { category: "Liquidity", label: "Liquidity Lock", status: "safe", detail: "Liquidity locked for 365 days", icon: <Lock className="w-4 h-4" /> },
  { category: "Honeypot", label: "Sell Restriction", status: "safe", detail: "No sell restrictions detected", icon: <Coins className="w-4 h-4" /> },
  { category: "Minting", label: "Mint Function", status: "danger", detail: "Unlimited minting possible", icon: <Zap className="w-4 h-4" /> },
  { category: "Tax", label: "Transaction Tax", status: "warning", detail: "5% buy/sell tax detected", icon: <AlertTriangle className="w-4 h-4" /> },
  { category: "Proxy", label: "Upgradeable", status: "safe", detail: "Not upgradeable", icon: <Shield className="w-4 h-4" /> },
];

export function ContractScannerDemo() {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [visibleResults, setVisibleResults] = useState<number[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    if (!address.trim()) return;
    
    setIsScanning(true);
    setShowResults(false);
    setVisibleResults([]);
    setScanProgress(0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Show results after "scanning"
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      
      // Animate results appearing one by one
      mockResults.forEach((_, index) => {
        setTimeout(() => {
          setVisibleResults((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 1800);
  };

  const getStatusColor = (status: ScanResult["status"]) => {
    switch (status) {
      case "safe": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "warning": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "danger": return "text-red-400 bg-red-500/10 border-red-500/20";
    }
  };

  const getStatusIcon = (status: ScanResult["status"]) => {
    switch (status) {
      case "safe": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "danger": return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const safeCount = mockResults.filter(r => r.status === "safe").length;
  const warningCount = mockResults.filter(r => r.status === "warning").length;
  const dangerCount = mockResults.filter(r => r.status === "danger").length;

  return (
    <section id="scanner" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="floating-shape w-80 h-80 bg-primary/5 top-0 right-0 blur-3xl" />
        <div className="floating-shape-delayed w-64 h-64 bg-accent/5 bottom-0 left-0 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            <span className="text-gradient">Try It Now</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Paste any contract address to see ChainShield's AI-powered analysis in action
          </p>
        </div>

        {/* Scanner Card */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-border/50">
          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="0x... Enter contract address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-12 h-14 text-base bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleScan}
              disabled={isScanning || !address.trim()}
              className="h-14 px-8"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Scan Contract
                </>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mb-6 animate-fade-in">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Analyzing contract...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-4 animate-fade-in">
              {/* Summary */}
              <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-background/30 border border-border/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm"><span className="font-semibold text-green-400">{safeCount}</span> Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm"><span className="font-semibold text-yellow-400">{warningCount}</span> Warnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm"><span className="font-semibold text-red-400">{dangerCount}</span> Critical</span>
                </div>
              </div>

              {/* Result Items */}
              <div className="grid gap-3">
                {mockResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${getStatusColor(result.status)} ${
                      visibleResults.includes(index) 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-4"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background/20">
                        {result.icon}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{result.label}</div>
                        <div className="text-sm opacity-80">{result.detail}</div>
                      </div>
                    </div>
                    {getStatusIcon(result.status)}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Want detailed reports and real-time monitoring?
                </p>
                <Button variant="hero-outline" size="lg">
                  Get Full Analysis
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isScanning && !showResults && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Enter a contract address above to start scanning</p>
              <p className="text-sm mt-2 opacity-60">Try: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
