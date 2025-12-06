import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ContractScannerDemo } from "@/components/ContractScannerDemo";
import { SecondHeroPanel } from "@/components/SecondHeroPanel";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { AdditionalBlocks } from "@/components/AdditionalBlocks";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ContractScannerDemo />
        <SecondHeroPanel />
        <FeaturesGrid />
        <AdditionalBlocks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
