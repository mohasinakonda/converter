"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const themeOption = localStorage.getItem("darkMode");
		const darkMode = themeOption === "true";
		setIsDarkMode(darkMode);
		console.log(themeOption);
		if (darkMode || themeOption === null) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		document.documentElement.classList.toggle("dark");
		localStorage.setItem("darkMode", newDarkMode.toString());
	};
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

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleDarkMode}
						aria-label="Toggle dark mode"
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
