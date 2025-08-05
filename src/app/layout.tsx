import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import { Metadata } from "next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Unit Converters - Developer Tools",
		template: "%s | Unit Converters",
	},
	description:
		"Simple and powerful conversion tools for developers and designers. Convert units, generate QR codes, beautify JSON, and more.",
	keywords: [
		"unit converter",
		"developer tools",
		"qr code generator",
		"json beautifier",
		"px to rem",
		"rgb to hex",
		"url encoder",
		"barcode reader",
		"web tools",
		"conversion tools",
	],
	authors: [{ name: "Dev Helperz" }],
	creator: "Dev Helperz",
	publisher: "Dev Helperz",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://dev-helperz.vercel.app",
		title: "Unit Converters - Developer Tools",
		description:
			"Simple and powerful conversion tools for developers and designers",
		siteName: "Unit Converters",
	},
	twitter: {
		card: "summary_large_image",
		title: "Unit Converters - Developer Tools",
		description:
			"Simple and powerful conversion tools for developers and designers",
	},
	verification: {
		google: "google052d21b235c32c81.html",
	},
	alternates: {
		canonical: "https://dev-helperz.vercel.app",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<link rel="canonical" href="https://dev-helperz.vercel.app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 `}
			>
				<Header />
				<div className="grid grid-cols-7 items-center">
					<div className="col-span-1">
						<SideNav />
					</div>
					<div className="col-span-6 w-full">{children}</div>
				</div>
				<Footer />
			</body>
		</html>
	);
}
