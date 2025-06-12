"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	ClipboardIcon,
	CheckIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";

const VwToPxConverter = () => {
	const [containerSize, setContainerSize] = useState("");
	const [pxValue, setPxValue] = useState("");
	const [copied, setCopied] = useState(false);

	const calculateVw = () => {
		if (!pxValue || !containerSize) return "";
		const pxNum = parseFloat(pxValue);
		const containerNum = parseFloat(containerSize);
		if (isNaN(pxNum) || isNaN(containerNum) || containerNum === 0) return "";
		const vwValue = (pxNum / containerNum) * 100;
		return vwValue.toFixed(4);
	};

	const handleContainerSizeChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setContainerSize(e.target.value);
	};

	const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPxValue(e.target.value);
	};

	const handleCopy = async () => {
		const result = calculateVw();
		if (result) {
			await navigator.clipboard.writeText(result + "vw");
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
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					Container-Based VW Calculator
				</h2>
			</div>

			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
				<div className="flex items-start space-x-2">
					<InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
					<div className="text-sm text-blue-700 dark:text-blue-300">
						<p className="mb-2">
							VW (viewport width) units are relative to the viewport&lsquo;s
							width. This calculator helps you convert pixel values to VW based
							on your container width.
						</p>
						<p>Formula: (pixel value / container width) × 100 = vw value</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter Container Size (px)
					</label>
					<input
						type="number"
						value={containerSize}
						onChange={handleContainerSizeChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						placeholder="e.g., 1440 or 1728"
						step="1"
					/>
					<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
						Common sizes: 1440px (Desktop), 768px (Tablet), 375px (Mobile)
					</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter Pixels Value
					</label>
					<input
						type="number"
						value={pxValue}
						onChange={handlePxChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						placeholder="Enter px value"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Result in VW
					</label>
					<div className="relative">
						<input
							type="text"
							readOnly
							value={`${calculateVw()}vw`}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
						<li>• 100px in 1440px container = 6.9444vw</li>
						<li>• 50px in 768px container = 6.5104vw</li>
						<li>• 20px in 375px container = 5.3333vw</li>
					</ul>
				</div>
			</div>
		</motion.div>
	);
};

export default VwToPxConverter;
