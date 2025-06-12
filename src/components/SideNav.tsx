"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	const navItems = [
		{ name: "QR Code Reader", href: "/qr-code-reader" },
		{ name: "QR Code Generator", href: "/qr-code-generator" },
		{ name: "JSON Beautifier", href: "/json-beautifier" },
		{ name: "VW to PX", href: "/vw-to-px" },
		{ name: "Percentage to PX", href: "/percentage-to-px" },
		{ name: "REM to PX", href: "/rem-to-px" },
		{ name: "EM to PX", href: "/em-to-px" },
		{ name: "URL Encoder/Decoder", href: "/url-converter" },

		{ name: "Barcode Reader", href: "/barcode-reader" },
	];

	if (isHomePage) return null;

	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -100, opacity: 0 }}
			className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto"
		>
			<nav className="space-y-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
								isActive
									? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
									: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
							}`}
						>
							<span className="font-medium">{item.name}</span>
						</Link>
					);
				})}
			</nav>
		</motion.div>
	);
};

export default SideNav;
