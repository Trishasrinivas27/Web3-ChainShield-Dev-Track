import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, TrendingUp, Shield, AlertTriangle, Bug, Brain, Layers } from "lucide-react";
import chainshieldLogo from "@/assets/chainshield-logo.png";

const categories = [
  { name: "All", slug: "all" },
  { name: "Security", slug: "security" },
  { name: "Tutorials", slug: "tutorials" },
  { name: "Research", slug: "research" },
  { name: "News", slug: "news" },
  { name: "Case Studies", slug: "case-studies" },
];

const featuredPost = {
  title: "How We Detected the $50M DeFi Exploit Before It Happened",
  excerpt: "Our AI-powered scanner identified critical vulnerabilities in a major DeFi protocol, preventing what could have been one of the largest exploits of 2024.",
  category: "Case Studies",
  date: "Dec 3, 2025",
  readTime: "8 min read",
  image: chainshieldLogo,
  slug: "50m-defi-exploit-prevention",
};

const articles = [
  {
    title: "Understanding Reentrancy Attacks: A Complete Guide",
    excerpt: "Learn how reentrancy attacks work and how ChainShield detects them before they drain your funds.",
    category: "Security",
    date: "Dec 1, 2025",
    readTime: "6 min read",
    icon: Shield,
    slug: "reentrancy-attacks-guide",
  },
  {
    title: "Top 10 Smart Contract Vulnerabilities in 2024",
    excerpt: "A comprehensive analysis of the most exploited vulnerabilities this year and how to protect against them.",
    category: "Research",
    date: "Nov 28, 2025",
    readTime: "12 min read",
    icon: AlertTriangle,
    slug: "top-10-vulnerabilities-2024",
  },
  {
    title: "How to Use ChainShield to Scan Any Token",
    excerpt: "Step-by-step tutorial on using our Chrome extension to analyze smart contracts in seconds.",
    category: "Tutorials",
    date: "Nov 25, 2025",
    readTime: "4 min read",
    icon: Layers,
    slug: "how-to-scan-tokens",
  },
  {
    title: "The Rise of AI in Blockchain Security",
    excerpt: "How artificial intelligence is revolutionizing the way we detect and prevent smart contract exploits.",
    category: "Research",
    date: "Nov 22, 2025",
    readTime: "10 min read",
    icon: Brain,
    slug: "ai-blockchain-security",
  },
  {
    title: "Honeypot Detection: What You Need to Know",
    excerpt: "Discover how honeypot scams work and why our detection rate is 99.7% accurate.",
    category: "Security",
    date: "Nov 18, 2025",
    readTime: "7 min read",
    icon: Bug,
    slug: "honeypot-detection-guide",
  },
  {
    title: "ChainShield Now Supports Arbitrum and Base",
    excerpt: "Expanding our multi-chain coverage to include two of the fastest-growing L2 networks.",
    category: "News",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    icon: TrendingUp,
    slug: "arbitrum-base-support",
  },
  {
    title: "Rugpull Anatomy: Breaking Down the SQUID Token Scam",
    excerpt: "A detailed post-mortem analysis of one of the most notorious rugpulls and how to spot similar schemes.",
    category: "Case Studies",
    date: "Nov 10, 2025",
    readTime: "15 min read",
    icon: AlertTriangle,
    slug: "squid-token-analysis",
  },
  {
    title: "Integrating ChainShield API in Your DApp",
    excerpt: "Developer guide to adding real-time security scanning to your decentralized application.",
    category: "Tutorials",
    date: "Nov 5, 2025",
    readTime: "9 min read",
    icon: Layers,
    slug: "api-integration-guide",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category.toLowerCase().replace(" ", "-") === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 animate-slide-up">
              ChainShield <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Insights, tutorials, and research on smart contract security from the ChainShield team.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative rounded-3xl overflow-hidden card-gradient border border-border/50 hover:border-primary/50 transition-all duration-500">
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        Featured
                      </span>
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl animate-glow-pulse" />
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-contain animate-float"
                        style={{ filter: "drop-shadow(0 0 40px hsl(217 91% 60% / 0.3))" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.slug
                    ? "button-gradient text-foreground button-shadow"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => {
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <article className="h-full card-gradient rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 card-shadow flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                        {article.category}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </article>
                </Link>
              );
            })}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <Button variant="hero-outline" size="lg">
              Load More Articles
            </Button>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-24 relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
            
            <div className="relative z-10 p-8 lg:p-12 text-center">
              <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4">
                Stay Updated on Web3 Security
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Get the latest security insights, vulnerability alerts, and tutorials delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button variant="hero" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
