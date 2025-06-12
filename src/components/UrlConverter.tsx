"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	ClipboardIcon,
	CheckIcon,
	ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

const UrlConverter = () => {
	const [value, setValue] = useState("");
	const [isEncoding, setIsEncoding] = useState(true);
	const [copied, setCopied] = useState(false);

	const convert = () => {
		if (!value) return "";
		try {
			return isEncoding ? encodeURIComponent(value) : decodeURIComponent(value);
		} catch (error) {
			return "Invalid input";
		}
	};

	const handleCopy = async () => {
		const result = convert();
		if (result && result !== "Invalid input") {
			await navigator.clipboard.writeText(result);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const toggleConverter = () => {
		setIsEncoding(!isEncoding);
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
					URL {isEncoding ? "Encoder" : "Decoder"}
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
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Enter URL to {isEncoding ? "Encode" : "Decode"}
					</label>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						placeholder={`Enter URL to ${isEncoding ? "encode" : "decode"}`}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{isEncoding ? "Encoded" : "Decoded"} Result
					</label>
					<div className="relative">
						<input
							type="text"
							readOnly
							value={convert()}
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
			</div>
		</motion.div>
	);
};

export default UrlConverter;
