/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
	ArrowUpTrayIcon,
	ClipboardIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeReader = () => {
	const [result, setResult] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [copied, setCopied] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		setError("");
		setResult("");

		try {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const imageUrl = e.target?.result as string;
				const img = new window.Image();
				img.src = imageUrl;
				img.onload = async () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext("2d");
					if (!ctx) {
						setError("Could not process image");
						setIsLoading(false);
						return;
					}
					ctx.drawImage(img, 0, 0);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					try {
						const codeReader = new BrowserMultiFormatReader();
						const luminanceSource = new (
							window as any
						).ZXing.HTMLCanvasElementLuminanceSource(canvas);
						const binaryBitmap = new (window as any).ZXing.BinaryBitmap(
							new (window as any).ZXing.HybridBinarizer(luminanceSource),
						);
						const result = codeReader.decode(binaryBitmap);
						setResult(result.getText());
					} catch (err) {
						try {
							const codeReader = new BrowserMultiFormatReader();
							const result = await codeReader.decodeFromImage(
								undefined,
								imageUrl,
							);
							setResult(result.getText());
						} catch (err2) {
							setError("Could not read barcode from image");
						}
					}
					setIsLoading(false);
				};
			};
			reader.readAsDataURL(file);
		} catch (err) {
			setError("Failed to read barcode. Please try again.");
			setIsLoading(false);
		}
	};

	const handleCopy = async () => {
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
				Barcode Reader
			</h2>
			<div className="space-y-4">
				<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
					<input
						type="file"
						accept="image/*"
						onChange={handleFileUpload}
						className="hidden"
						id="barcode-file-input"
						ref={fileInputRef}
					/>
					<label
						htmlFor="barcode-file-input"
						className="cursor-pointer flex flex-col items-center justify-center"
					>
						<ArrowUpTrayIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
						<span className="text-sm text-gray-600 dark:text-gray-400">
							Click to upload or drag and drop
						</span>
						<span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
							Supported formats: JPG, PNG, GIF
						</span>
					</label>
				</div>

				{isLoading && (
					<div className="text-center text-gray-600 dark:text-gray-400">
						Processing...
					</div>
				)}

				{error && (
					<div className="text-center text-red-500 dark:text-red-400">
						{error}
					</div>
				)}

				{result && (
					<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
						<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Result
						</h3>
						<div className="flex items-center justify-between">
							<p className="text-gray-800 dark:text-white break-all mr-2">
								{result}
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleCopy}
								className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								{copied ? (
									<CheckIcon className="w-5 h-5 text-green-500" />
								) : (
									<ClipboardIcon className="w-5 h-5" />
								)}
							</motion.button>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default BarcodeReader;
