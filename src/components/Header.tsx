"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "VW to PX", href: "/vw-to-px" },
    { name: "REM to PX", href: "/rem-to-px" },
    { name: "EM to PX", href: "/em-to-px" },
    { name: "% to PX", href: "/percentage-to-px" },
    { name: "RGB to HEX", href: "/rgb-to-hex" },
    { name: "URL Converter", href: "/url-converter" },
    { name: "QR Code", href: "/qr-code-reader" },
    { name: "Barcode", href: "/barcode-reader" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.img
              src="/window.svg"
              alt="Logo"
              className="h-8 w-8 dark:invert"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Converter
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Header;