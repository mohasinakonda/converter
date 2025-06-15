"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	ClipboardIcon,
	CheckIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";

const PercentageToPxConverter = () => {
	const [percentageValue, setPercentageValue] = useState("");
	const [baseValue, setBaseValue] = useState("");
	const [copied, setCopied] = useState(false);

	const calculatePx = () => {
		if (!percentageValue || !baseValue) return "";
		const pxValue = (parseFloat(percentageValue) * parseFloat(baseValue)) / 100;
		return Math.round(pxValue);
	};

	const handleCopy = async () => {
		const result = calculatePx();
		if (result) {
			await navigator.clipboard.writeText(result.toString());
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
				Percentage to PX Converter
			</h2>

			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
				<div className="flex items-start space-x-2">
					<InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
					<div className="text-sm text-blue-700 dark:text-blue-300">
						<p className="mb-2">
							Percentage values in CSS are relative to their parent
							element&apos;s dimensions. This calculator helps you convert
							percentage values to pixels based on a parent element&apos;s size.
						</p>
						<p>Formula: (percentage × base value) ÷ 100 = pixel value</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Base Value (in pixels)
					</label>
					<input
						type="number"
						value={baseValue}
						onChange={(e) => setBaseValue(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-700"
						placeholder="Enter base value in pixels"
					/>
					<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
						Common sizes: 1920px (Full HD), 1440px (Desktop), 768px (Tablet)
					</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter Percentage Value
					</label>
					<input
						type="number"
						value={percentageValue}
						onChange={(e) => setPercentageValue(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-700"
						placeholder="Enter percentage value"
						step="0.1"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Result in Pixels
					</label>
					<div className="relative">
						<input
							type="text"
							readOnly
							value={`${calculatePx()}px`}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-700"
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
						<li>• 100% of 1920px = 1920px (Full width)</li>
						<li>• 50% of 1440px = 720px (Half width)</li>
						<li>• 25% of 768px = 192px (Quarter width)</li>
					</ul>
				</div>
			</div>
		</motion.div>
	);
};

export default PercentageToPxConverter;
