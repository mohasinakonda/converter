"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardIcon, CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const RgbToHexConverter = () => {
	const [rgbInput, setRgbInput] = useState("");
	const [copied, setCopied] = useState(false);

	const parseRgbString = (input: string) => {
		const rgbRegex = /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+)\s*)?\)$/;
		const match = input.match(rgbRegex);

		if (!match) return null;

		const [, r, g, b, a] = match;
		const red = parseInt(r);
		const green = parseInt(g);
		const blue = parseInt(b);
		const alpha = a ? parseFloat(a) : 1;

		if (
			isNaN(red) || red < 0 || red > 255 ||
			isNaN(green) || green < 0 || green > 255 ||
			isNaN(blue) || blue < 0 || blue > 255 ||
			isNaN(alpha) || alpha < 0 || alpha > 1
		) {
			return null;
		}

		return { red, green, blue, alpha };
	};

	const componentToHex = (c: number) => {
		const hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};

	const calculateHex = () => {
		const color = parseRgbString(rgbInput);
		if (!color) return "";

		const { red, green, blue, alpha } = color;
		const hexColor = `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
		
		if (alpha !== 1) {
			const hexAlpha = componentToHex(Math.round(alpha * 255));
			return `${hexColor}${hexAlpha}`.toUpperCase();
		}

		return hexColor.toUpperCase();
	};

	const getPreviewColor = () => {
		const color = parseRgbString(rgbInput);
		return color ? rgbInput : "transparent";
	};

	const handleCopy = async () => {
		const result = calculateHex();
		if (result) {
			await navigator.clipboard.writeText(result);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
		>
			<h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
				RGB to HEX Converter
			</h2>

			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
				<div className="flex items-start space-x-2">
					<InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
					<div className="text-sm text-blue-700 dark:text-blue-300">
						<p className="mb-2">
							Convert RGB or RGBA colors to hexadecimal format. RGB values range from 0-255, and alpha (opacity) ranges from 0-1.
						</p>
						<p>
							Example: rgb(255, 0, 0) = #FF0000
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter RGB or RGBA Color
					</label>
					<input
						type="text"
						value={rgbInput}
						onChange={(e) => setRgbInput(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						placeholder="e.g. rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)"
					/>
				</div>

				<div className="mt-6">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Color Preview
					</label>
					<div
						className="h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600"
						style={{
							backgroundColor: getPreviewColor(),
							backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")'
						}}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Hex Color
					</label>
					<div className="relative">
						<input
							type="text"
							readOnly
							value={calculateHex()}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white uppercase"
						/>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleCopy}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							{copied ? (
								<CheckIcon className="w-5 h-5 text-green-500" />
							) : (
								<ClipboardIcon className="w-5 h-5" />
							)}
						</motion.button>
					</div>
				</div>

				<div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
					<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Common Examples
					</h3>
					<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
						<li>• Red: rgb(255, 0, 0) = #FF0000</li>
						<li>• Green: rgb(0, 255, 0) = #00FF00</li>
						<li>• Blue: rgb(0, 0, 255) = #0000FF</li>
						<li>• Semi-transparent Black: rgba(0, 0, 0, 0.5) = #00000080</li>
					</ul>
				</div>
			</div>
		</motion.div>
	);
};

export default RgbToHexConverter;