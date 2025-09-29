'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 标记客户端已挂载
    setIsClient(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationGroups = [
    {
      title: "LAYOUTS",
      links: [
        { href: "/layouts/nested-layouts", label: "Nested layouts" },
        { href: "/layouts/route-groups", label: "Route Groups" },
        { href: "/layouts/parallel-routes", label: "Parallel Routes" },
      ],
    },
    {
      title: "FILE CONVENTIONS",
      links: [
        { href: "/file-conventions/loading", label: "Loading" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold">咏雪轩阁</h1>
              </div>
            </Link>
            <div className="flex items-center space-x-8">
              {navigationGroups.map((group) => (
                <div key={group.title} className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">
                    {group.title}
                  </span>
                  <div className="flex space-x-4 text-sm">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center">
              <h1 className="text-base font-semibold">咏雪轩阁</h1>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/20">
            <div className="flex flex-col space-y-6 pt-4">
              {navigationGroups.map((group) => (
                <div key={group.title} className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-muted-foreground px-4">
                    {group.title}
                  </span>
                  <div className="flex flex-col space-y-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm hover:text-primary hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
