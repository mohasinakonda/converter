"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";

export const QRCodeGenerator = () => {
	const [inputText, setInputText] = useState("");
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
	const [qrCodeSize, setQrCodeSize] = useState(256);
	const [qrTitle, setQrTitle] = useState("");
	const [qrDescription, setQrDescription] = useState("");
	const generateQRCode = async (text: string) => {
		try {
			const dataUrl = await QRCode.toDataURL(text, {
				width: qrCodeSize,
				margin: 1,
			});
			setQrCodeDataUrl(dataUrl);
		} catch (error) {
			console.log("Error generating QR code");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(e.target.value);
		if (e.target.value) {
			generateQRCode(e.target.value);
		} else {
			setQrCodeDataUrl("");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					QR Code Generator
				</h2>
				<Link
					href="/qr-code-reader"
					className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
				>
					<ArrowsRightLeftIcon className="w-5 h-5" />
				</Link>
			</div>
			<div className="flex gap-6">
				{/* Left side - Input fields */}
				<div className="w-1/2 space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							QR Code Title
						</label>
						<Input
							type="text"
							value={qrTitle}
							onChange={(e) => setQrTitle(e.target.value)}
							placeholder="Enter QR code title"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Description
						</label>
						<Input
							type="text"
							value={qrDescription}
							onChange={(e) => setQrDescription(e.target.value)}
							placeholder="Enter description"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Enter Text to Generate QR Code
						</label>
						<textarea
							value={inputText}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-700 min-h-[100px]"
							placeholder="Enter text to generate QR code"
						/>
					</div>
				</div>

				{/* Right side - Preview and Download */}
				<div className="w-1/2">
					{qrCodeDataUrl ? (
						<div className="flex flex-col items-center space-y-4 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg h-full">
							{qrTitle && (
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
									{qrTitle}
								</h3>
							)}
							{qrDescription && (
								<p className="text-sm text-gray-600 dark:text-gray-300">
									{qrDescription}
								</p>
							)}
							<div className="relative">
								<img
									src={qrCodeDataUrl}
									alt="Generated QR Code"
									className="w-48 h-48"
									style={{
										width: `${qrCodeSize}px`,
										height: `${qrCodeSize}px`,
									}}
								/>
							</div>
							<div className="flex gap-4">
								<motion.button
									onClick={async () => {
										const canvas = document.createElement("canvas");
										const ctx = canvas.getContext("2d");
										if (!ctx) return;

										// Set canvas size to accommodate title, description, and QR code
										const padding = 40;
										const titleHeight = qrTitle ? 30 : 0;
										const descHeight = qrDescription ? 20 : 0;
										const totalHeight =
											titleHeight + descHeight + qrCodeSize + padding * 2;

										canvas.width = qrCodeSize + padding * 2;
										canvas.height = totalHeight;

										// Enable text smoothing
										ctx.imageSmoothingEnabled = true;
										ctx.imageSmoothingQuality = "high";

										// Fill white background
										ctx.fillStyle = "white";
										ctx.fillRect(0, 0, canvas.width, canvas.height);

										// Add title if present
										let YOffset = padding;
										if (qrTitle) {
											ctx.fillStyle = "black";
											ctx.font =
												"bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
											ctx.textAlign = "center";
											ctx.textBaseline = "middle";
											// Scale up the canvas temporarily for better text rendering
											const scale = 2;
											ctx.save();
											ctx.scale(scale, scale);

											ctx.restore();
											YOffset += titleHeight;
										}

										// Add description if present
										if (qrDescription) {
											ctx.fillStyle = "black";
											ctx.font =
												"14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
											ctx.textAlign = "center";
											ctx.textBaseline = "middle";
											// Scale up the canvas temporarily for better text rendering
											const scale = 2;
											ctx.save();
											ctx.scale(scale, scale);

											ctx.restore();
											YOffset += descHeight;
										}

										// Draw QR code
										const qrImage = new Image();
										qrImage.src = qrCodeDataUrl;
										await new Promise((resolve) => {
											qrImage.onload = () => {
												ctx.drawImage(
													qrImage,
													padding,
													YOffset,
													qrCodeSize,
													qrCodeSize,
												);
												resolve(null);
											};
										});

										// Add logo if present

										// Convert to PDF and download
										const { jsPDF } = await import("jspdf");
										// Create PDF with A4 size
										const pdf = new jsPDF({
											orientation: "portrait",
											unit: "mm",
											format: "a4",
										});

										// A4 dimensions in mm
										const pageWidth = 210;
										const pageHeight = 297;
										const margin = 20; // 20mm margin

										// Calculate scaled dimensions to fit within margins while maintaining aspect ratio
										const availableWidth = pageWidth - 2 * margin;
										const availableHeight = pageHeight - 2 * margin;
										const imageAspectRatio = canvas.width / canvas.height;

										let finalWidth = availableWidth;
										let finalHeight = finalWidth / imageAspectRatio;

										if (finalHeight > availableHeight) {
											finalHeight = availableHeight;
											finalWidth = finalHeight * imageAspectRatio;
										}

										// Center the image horizontally
										const xOffset = (pageWidth - finalWidth) / 2;
										const yOffset = margin;

										// Add title with word wrap if present
										if (qrTitle) {
											pdf.setFontSize(16);
											const titleLines = pdf.splitTextToSize(
												qrTitle,
												availableWidth,
											);
											pdf.text(titleLines, pageWidth / 2, yOffset, {
												align: "center",
											});
										}

										// Add description with word wrap if present
										if (qrDescription) {
											pdf.setFontSize(12);
											const descriptionLines = pdf.splitTextToSize(
												qrDescription,
												availableWidth,
											);
											pdf.text(descriptionLines, pageWidth / 2, yOffset + 10, {
												align: "center",
											});
										}

										// Add the QR code image
										pdf.addImage(
											canvas.toDataURL("image/png"),
											"PNG",
											xOffset,
											yOffset + (qrTitle ? 20 : 0) + (qrDescription ? 15 : 0),
											finalWidth,
											finalHeight,
										);

										pdf.save("qr-code.pdf");
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Download PDF</span>
								</motion.button>
							</div>
						</div>
					) : (
						<div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
							<p className="text-gray-500 dark:text-gray-400 text-center">
								Enter text to generate QR code preview
							</p>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};
