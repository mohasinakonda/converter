"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { BrowserQRCodeReader } from "@zxing/library";
import {
	ArrowsRightLeftIcon,
	ClipboardIcon,
	CheckIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const QrCodeReader = () => {
	const [result, setResult] = useState("");
	const [error, setError] = useState("");
	const [isEncoding, setIsEncoding] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [copiedResult, setCopiedResult] = useState(false);

	const handleCopyResult = async () => {
		if (result) {
			await navigator.clipboard.writeText(result);
			setCopiedResult(true);
			setTimeout(() => setCopiedResult(false), 2000);
		}
	};
	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			setError("");
			const reader = new FileReader();
			reader.onload = async (e) => {
				const imageUrl = e.target?.result as string;
				const img = new Image();
				img.src = imageUrl;

				img.onload = async () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext("2d");
					if (!ctx) return;

					ctx.drawImage(img, 0, 0);

					try {
						const codeReader = new BrowserQRCodeReader();
						const result = await codeReader.decodeFromImage(
							undefined,
							imageUrl,
						);
						setResult(result.getText());
					} catch (error) {
						setError("Could not read QR code from image");
					}
				};
			};
			reader.readAsDataURL(file);
		} catch (error) {
			setError("Error processing image");
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();

		const file = event.dataTransfer.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const input = fileInputRef.current;
			if (input) {
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				input.files = dataTransfer.files;
				input.dispatchEvent(new Event("change", { bubbles: true }));
			}
		} else {
			setError("Please upload an image file");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					QR Code Reader
				</h2>
				<Link
					href="/qr-code-generator"
					className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
				>
					<ArrowsRightLeftIcon className="w-5 h-5" />
				</Link>
			</div>
			<div
				className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => fileInputRef.current?.click()}
			>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileUpload}
					accept="image/*"
					className="hidden"
				/>
				<div className="text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center">
					<span>
						<ArrowUpTrayIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
					</span>
					<p className="mb-2">Drag and drop a QR code image here</p>
					<p className="text-sm">or click to upload</p>
				</div>
			</div>

			{error && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm"
				>
					{error}
				</motion.div>
			)}

			{result && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mt-6"
				>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						QR Code Content
					</label>
					<div className="relative">
						<textarea
							readOnly
							value={result}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px]"
						/>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleCopyResult}
							className="absolute right-2 top-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							{copiedResult ? (
								<CheckIcon className="w-5 h-5 text-green-500" />
							) : (
								<ClipboardIcon className="w-5 h-5" />
							)}
						</motion.button>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default QrCodeReader;
