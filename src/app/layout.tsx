import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "V60 Recipe App",
		template: "%s | V60 Recipe App",
	},
	description:
		"Brew delicious coffee using our V60 Recipe App with dynamic instructions and tips.",

	openGraph: {
		title: "V60 Recipe App",
		description:
			"Brew delicious coffee using our V60 method with dynamic instructions and tips.",
		siteName: "V60 Recipe App",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "V60 Recipe App",
		description:
			"Brew delicious coffee using our V60 recipe method. Adjust coffee, ratio, and more.",
	},
	icons: {
		icon: "/favicon.ico",
	},
	alternates: {
		canonical: "https://www.example.com",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
