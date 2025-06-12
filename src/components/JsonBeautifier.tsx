/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	ClipboardIcon,
	CheckIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Editor from "@monaco-editor/react";

const JsonBeautifier = () => {
	const [input, setInput] = useState("");
	const [parsedJson, setParsedJson] = useState<any>(null);

	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const formatJson = (jsonString: string) => {
		try {
			if (!jsonString.trim()) {
				setParsedJson(null);
				setError("");
				return;
			}

			const parsed = JSON.parse(jsonString);
			setParsedJson(parsed);
			setError("");
		} catch (err) {
			setError("Invalid JSON format");
			setParsedJson(null);
		}
	};

	const handleInputChange = (value: string | undefined) => {
		if (value !== undefined) {
			setInput(value);
			formatJson(value);
		}
	};

	const handleCopy = async () => {
		if (parsedJson) {
			await navigator.clipboard.writeText(JSON.stringify(parsedJson, null, 2));
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-5xl p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					JSON Beautifier
				</h2>
			</div>

			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
				<div className="flex items-start space-x-2">
					<InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
					<div className="text-sm text-blue-700 dark:text-blue-300">
						<p>
							Paste your unformatted JSON here. The editor will automatically
							format and validate your JSON.
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Input JSON
					</label>
					<div className="h-[400px] border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
						<Editor
							height="400px"
							defaultLanguage="json"
							value={input}
							onChange={handleInputChange}
							theme="vs-dark"
							options={{
								minimap: { enabled: false },
								formatOnPaste: true,
								formatOnType: true,
								autoIndent: "full",
							}}
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Formatted JSON
					</label>
					<div className="relative">
						<div className="h-[400px] border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
							<Editor
								height="400px"
								defaultLanguage="json"
								value={parsedJson ? JSON.stringify(parsedJson, null, 2) : ""}
								theme="vs-dark"
								options={{
									readOnly: true,
									minimap: { enabled: false },
								}}
							/>
						</div>
						{parsedJson && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleCopy}
								className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
							>
								{copied ? (
									<CheckIcon className="w-5 h-5 text-green-500" />
								) : (
									<ClipboardIcon className="w-5 h-5" />
								)}
							</motion.button>
						)}
					</div>
					{error && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400">
							{error}
						</p>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default JsonBeautifier;
