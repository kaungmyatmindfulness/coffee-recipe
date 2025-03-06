import type { Metadata } from "next";

import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import "./globals.css";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

const font = Lora({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Krafty Brew Coffee",
		template: "%s | Krafty Brew Coffee",
	},
	description:
		"Enhance your coffee experience with Krafty Brew Coffee – your go-to guide for V60 brewing, flavor estimation, and expert coffee tips & tricks.",

	openGraph: {
		title: "Krafty Brew Coffee",
		description:
			"Krafty Brew Coffee is your coffee companion for V60 recipes, flavor estimation, and expert tips. Perfect your brewing process and explore new coffee tricks for a delicious cup every time.",
		siteName: "Krafty Brew Coffee",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/v60-social-cover.jpg",
				width: 1200,
				height: 630,
				alt: "Krafty Brew Coffee - V60 Drip Coffee Setup with Cup",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Krafty Brew Coffee - Brew Coffee Better",
		description:
			"Discover V60 brewing, flavor estimations, and coffee tips & tricks with Krafty Brew Coffee – the ultimate coffee companion.",
	},
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				{/* Google tag (gtag.js) */}
				<Script
					strategy="afterInteractive"
					src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
				/>
				<Script id="gtag-init" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}', {
              page_path: window.location.pathname,
            });
          `}
				</Script>
			</head>

			<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

			<body className={`${font.className} antialiased`}>
				{/* HEADER */}
				<header className="w-full border-b bg-white shadow-sm">
					<nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
						<h1 className="flex items-center gap-2 text-lg font-bold">
							<Image
								src="/favicon.svg"
								alt="Krafty Brew Coffee Icon"
								width={24}
								height={24}
								className="h-6 w-6"
							/>
							Krafty Brew Coffee
						</h1>
						<NavigationMenu>
							<NavigationMenuList>
								{/* Home nav link */}
								<NavigationMenuItem>
									<Link href="/" legacyBehavior passHref>
										<NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:underline">
											Home
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								{/* Estimator nav link */}
								<NavigationMenuItem>
									<Link href="/estimator" legacyBehavior passHref>
										<NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:underline">
											Estimator
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</nav>
				</header>
				{/* MAIN CONTENT */}
				{children}

				{/* FOOTER */}
				<footer className="border-t py-4 text-center text-sm text-gray-700">
					<p>
						© {new Date().getFullYear()} Crafted with{" "}
						<span className="font-semibold">Love</span>,{" "}
						<span className="font-semibold">Coffee</span>, and Next.js.
					</p>
					<p>All rights reserved.</p>
				</footer>
			</body>
		</html>
	);
}
