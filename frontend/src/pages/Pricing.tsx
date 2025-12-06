import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  gradient?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "Perfect for getting started with contract security",
    price: "$0",
    period: "forever",
    icon: <Shield className="w-6 h-6" />,
    cta: "Get Started",
    features: [
      { text: "5 contract scans per day", included: true },
      { text: "Basic vulnerability detection", included: true },
      { text: "Honeypot analysis", included: true },
      { text: "Community support", included: true },
      { text: "API access", included: false },
      { text: "Priority scanning", included: false },
      { text: "Custom reports", included: false },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For serious traders and developers",
    price: "$29",
    period: "/month",
    icon: <Zap className="w-6 h-6" />,
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-primary to-accent",
    features: [
      { text: "Unlimited contract scans", included: true },
      { text: "Advanced AI analysis", included: true },
      { text: "Rugpull prediction", included: true },
      { text: "Real-time monitoring", included: true },
      { text: "API access (10k calls/mo)", included: true },
      { text: "Priority scanning", included: true },
      { text: "Export PDF reports", included: true },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    price: "Custom",
    period: "pricing",
    icon: <Building2 className="w-6 h-6" />,
    cta: "Contact Sales",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLA guarantee", included: true },
      { text: "On-premise deployment", included: true },
      { text: "Team collaboration", included: true },
      { text: "White-label options", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and crypto payments including ETH, USDC, and USDT.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Pro comes with a 7-day free trial. No credit card required to start.",
  },
  {
    q: "What chains do you support?",
    a: "We support Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, and Fantom with more coming soon.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="floating-shape w-96 h-96 bg-primary/10 top-0 -left-48 blur-3xl" />
            <div className="floating-shape-delayed w-80 h-80 bg-accent/10 top-20 right-0 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl mb-6 animate-slide-up">
              <span className="text-gradient">Simple, Transparent</span>
              <br />
              <span className="text-foreground">Pricing</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Choose the plan that fits your needs. All plans include our core security features.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
                  plan.popular
                    ? "glass border-2 border-primary/50 shadow-2xl shadow-primary/20"
                    : "glass border border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${plan.popular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {plan.icon}
                  </div>
                  <h3 className="font-display font-bold text-2xl">{plan.name}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="font-display font-bold text-4xl">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>

                <Button
                  variant={plan.popular ? "hero" : "hero-outline"}
                  className="w-full mb-8"
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`rounded-full p-0.5 ${feature.included ? "text-green-400" : "text-muted-foreground/40"}`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/40 line-through"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-center mb-12">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>

          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 border border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/add-extension">
              <Button variant="hero-outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
