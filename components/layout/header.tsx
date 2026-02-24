"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAL_LINK } from "@/lib/constants";

const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(function watchScroll() {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(
    function closeMobileOnNavigation() {
      setIsOpen(false);
    },
    [pathname],
  );

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-surface-0/80 backdrop-blur-md border-surface-200 shadow-lg shadow-surface-0/20"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-icon.png"
              alt="Cortex Automations Logo"
              width={32}
              height={32}
              className="object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Cortex <span className="text-brand-400">Automations</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map(function (item) {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-400",
                    isActive ? "text-white" : "text-neutral-400",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium text-white bg-surface-100 border border-surface-200 rounded-lg hover:bg-surface-200 transition-colors"
            >
              Book Discovery Call
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" /> Start Project
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-20 left-0 w-full bg-surface-50 border-b border-surface-200 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-6 space-y-4 flex flex-col">
          {NAVIGATION.map(function (item) {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors block py-2",
                  isActive ? "text-brand-400" : "text-neutral-300 hover:text-white",
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-surface-200 flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full py-3 text-center text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
            >
              Start Project
            </Link>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center text-sm font-medium text-white bg-surface-100 border border-surface-200 rounded-lg hover:bg-surface-200 transition-colors"
            >
              Book Discovery Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
