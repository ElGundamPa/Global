"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Soluciones", href: "#advantages" },
    { label: "Conócenos", href: "#testimonials" },
    { label: "Contacto", href: "#footer" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-fortune-green/10 shadow-lg shadow-fortune-green/5"
          : "bg-black/70 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-7 h-7 bg-gradient-to-br from-fortune-green to-fortune-electric rounded-lg shadow-lg shadow-fortune-green/30"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-fortune-green transition-colors duration-300">
                FORTUNE
              </span>
              <span className="text-gray-500 text-xs font-medium group-hover:text-fortune-electric transition-colors duration-300">
                GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="relative text-gray-300 text-sm font-medium whitespace-nowrap px-4 py-2 mx-1 group overflow-hidden rounded-lg"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fortune-green via-fortune-electric to-fortune-green"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* Hover background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-fortune-green/0 via-fortune-green/10 to-fortune-electric/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: "blur(8px)" }}
                  />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link href="/auth/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-fortune-green hover:bg-fortune-green/10 whitespace-nowrap transition-all duration-300 border border-transparent hover:border-fortune-green/30"
                >
                  Iniciar sesión
                </Button>
              </motion.div>
            </Link>
            <Link href="/auth/signup">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  size="sm"
                  className="relative bg-gradient-to-r from-fortune-green to-fortune-electric hover:shadow-lg hover:shadow-fortune-green/50 text-black font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10">Registrarse</span>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 flex-shrink-0 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="py-4 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-gray-300 hover:text-white text-sm transition-all duration-300 px-4 py-2 rounded-lg hover:bg-fortune-green/10 hover:border-l-2 hover:border-fortune-green"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex flex-col gap-2 mt-4 px-4"
                >
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-white hover:bg-white/5 hover:border-fortune-green/50 transition-all duration-300"
                    >
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-fortune-green to-fortune-electric hover:shadow-lg hover:shadow-fortune-green/50 text-black font-semibold transition-all duration-300"
                    >
                      Registrarse
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

