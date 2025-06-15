import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "QR Code Generator",
	description:
		"Generate QR codes from any text and download them instantly as high-quality PDF files. Fast, free, and easy-to-use QR Code Generator app.",
	keywords:
		"QR code generator, text to QR, download PDF QR code, free QR code app, QR code maker, text QR code, QR code PDF download, instant QR code, customizable QR codes, QR code online,best qr code generator online,qr code generator,qr code generator app,qr code generator online,qr code generator tool,qr code generator website,qr code generator tool online,qr code generator website online,qr code generator tool for free,qr code generator website for free,qr code generator tool for business,qr code generator website for business,qr code generator tool for personal use,qr code generator",
};
const QRCodeGeneratorPage = () => {
	return <QRCodeGenerator />;
};
export default QRCodeGeneratorPage;
