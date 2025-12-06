import { Link } from "react-router-dom";
import chainshieldLogo from "@/assets/chainshield-logo.png";
import { Twitter, Github, MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "/#features" },
    { name: "Security Scanner", href: "/#scanner" },
    { name: "Extension", href: "/add-extension" },
    { name: "Chrome Store", href: "/chrome-store" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api" },
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Press Kit", href: "/press" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/chainshield", label: "Twitter" },
  { icon: Github, href: "https://github.com/chainshield", label: "GitHub" },
  { icon: MessageCircle, href: "https://discord.gg/chainshield", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={chainshieldLogo}
                alt="ChainShield"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display font-bold text-xl text-foreground">
                ChainShield
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              AI-Powered Smart Contract Security Scanner. Protect your investments from scams and vulnerabilities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ChainShield Labs. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Protecting Web3, one contract at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
