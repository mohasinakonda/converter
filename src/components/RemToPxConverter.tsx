"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	ClipboardIcon,
	CheckIcon,
	ArrowsRightLeftIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";

const RemToPxConverter = () => {
	const [value, setValue] = useState("");
	const [isRemToPx, setIsRemToPx] = useState(false);
	const [copied, setCopied] = useState(false);

	const baseRemSize = 16; // Default browser REM size

	const calculate = () => {
		if (!value) return "";
		const numValue = parseFloat(value);
		if (isRemToPx) {
			return `${Math.round(numValue * baseRemSize)}px`;
		}
		return `${(numValue / baseRemSize).toFixed(4)}rem`;
	};

	const handleCopy = async () => {
		const result = calculate();
		if (result) {
			await navigator.clipboard.writeText(result);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const toggleConverter = () => {
		setIsRemToPx(!isRemToPx);
		setValue("");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					{isRemToPx ? "REM to PX" : "PX to REM"} Converter
				</h2>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={toggleConverter}
					className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
				>
					<ArrowsRightLeftIcon className="w-5 h-5" />
				</motion.button>
			</div>

			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
				<div className="flex items-start space-x-2">
					<InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
					<div className="text-sm text-blue-700 dark:text-blue-300">
						<p className="mb-2">
							REM (Root EM) is relative to the root element&apos;s font size. By
							default, 1rem equals 16px in most browsers.
						</p>
						<p>Formula: 1rem = 16px (default)</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter {isRemToPx ? "REM" : "PX"} Value
					</label>
					<input
						type="number"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 text-gray-700 dark:border-gray-600 dark:text-white"
						placeholder={`Enter ${isRemToPx ? "REM" : "PX"} value`}
						step={isRemToPx ? "0.1" : "1"}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Result in {isRemToPx ? "Pixels" : "REM"}
					</label>
					<div className="relative">
						<input
							type="text"
							readOnly
							value={calculate()}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white"
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
						<li>• 1rem = 16px (Base size)</li>
						<li>• 1.5rem = 24px (Large text)</li>
						<li>• 0.875rem = 14px (Small text)</li>
					</ul>
				</div>
			</div>
		</motion.div>
	);
};

export default RemToPxConverter;
