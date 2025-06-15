import QrCodeReader from "@/components/QrCodeReader";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "QR Code Reader",
	description:
		"Scan and decode QR codes instantly with our fast, free QR Code Reader app.",
	keywords:
		"qr code scanner, qr code reader, code scanner app, scan qr code fast, free qr scanner, qr code reader tool, qr code scan app, qr reader for wifi, qr code decoder, qr code reader online,",
};
export default function QrCodeReaderPage() {
	return (
		<div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
			<QrCodeReader />
		</div>
	);
}
