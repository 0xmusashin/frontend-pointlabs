/** @format */

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/#research" },
  { label: "Articles", href: "/articles" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/point_labs_", icon: Twitter },
  { label: "GitHub", href: "https://github.com/point-labs", icon: Github },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-mono text-accent text-sm">&gt;|&lt;</span>
              <span className="font-semibold tracking-tight">Point Labs</span>
            </Link>
            <p className="text-sm text-foreground-secondary max-w-xs">
              Building at the intersection of AI and Web3.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <nav className="flex flex-col gap-2">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-1">
                Navigation
              </span>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground-secondary hover:text-foreground transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-2">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-1">
                Connect
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-150"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Point Labs. All rights reserved.
          </p>
          <p className="text-xs text-foreground-faint font-mono">v0.1.0</p>
        </div>
      </div>
    </footer>
  );
}
