import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
	title: "Unit Converters",
	description:
		"Simple and powerful conversion tools for developers and designers",
	keywords:
		"unit converter,unit converter app,unit converter tool,unit converter website,unit converter for free,unit converter for business,unit converter for personal use,unit converter tool online,unit converter website online,unit converter tool for free,unit converter website for free,unit converter tool for business,unit converter website for business,unit converter tool for personal use,unit converter",
	verification: {
		google: "google052d21b235c32c81.html",
	},
};
export default function Home() {
	const converters = [
		{ name: "QR Code Reader", href: "/qr-code-reader", icon: "📱" },
		{ name: "QR Code Generator", href: "/qr-code-generator", icon: "📱" },
		{ name: "JSON Beautifier", href: "/json-beautifier", icon: "📦" },
		{ name: "VW to PX", href: "/vw-to-px", icon: "📏" },
		{ name: "Percentage to PX", href: "/percentage-to-px", icon: "💯" },
		{ name: "REM to PX", href: "/rem-to-px", icon: "📐" },
		{ name: "EM to PX", href: "/em-to-px", icon: "📊" },
		{ name: "RGB to HEX", href: "/rgb-to-hex", icon: "🎨" },
		{ name: "URL Encoder/Decoder", href: "/url-converter", icon: "🔗" },

		{ name: "Barcode Reader", href: "/barcode-reader", icon: "📦" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
			<main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-geist-sans)]">
						Unit Converters
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Simple and powerful conversion tools for developers and designers
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{converters.map((converter) => (
						<Link
							key={converter.href}
							href={converter.href}
							className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<div className="p-8">
								<div className="flex items-center justify-between mb-4">
									<span className="text-4xl">{converter.icon}</span>
									<div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors duration-300">
										<svg
											className="w-5 h-5 text-gray-500 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white transition-colors duration-300"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</div>
								</div>
								<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
									{converter.name}
								</h2>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
