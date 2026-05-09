"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Moon, Sun, Globe2, Flag, Compass, LayoutDashboard, Layers, Brain, BookOpen, BarChart2, ThumbsUp, Info } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const pathname = usePathname();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
    setIsDark(!isDark);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 1) {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults([]);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/random-country-generator", label: "Random Generator", icon: Compass },
    { href: "/compare", label: "Compare", icon: Layers },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/rankings", label: "Rankings", icon: BarChart2 },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md" : "bg-white/70 dark:bg-gray-900/70 backdrop-blur"} border-b border-transparent`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hidden sm:block">
                Random Country
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {<link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                {searchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                    <div className="p-2">
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search countries..."
                        autoFocus
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((c) => (
                          <Link
                            key={c.code}
                            href={`/country/${c.code}`}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <img src={c.flagIcon || c.flagUrl} alt={c.name} className="w-6 h-4 rounded shadow-sm" />
                            <span className="text-sm">{c.name}</span>
                          </Link>
                        ))
                      ) : searchQuery.length > 1 ? (
                        <p className="px-4 py-4 text-sm text-gray-500">No countries found</p>
                      ) : (
                        <p className="px-4 py-4 text-sm text-gray-500">Type to search countries</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
            <div className="mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search countries..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
              />
            </div>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {<link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}