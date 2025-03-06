"use client";

import React, { useState, useEffect } from "react";

// ShadCN UI imports
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Example sets for your dropdown selects
const PROCESS_TYPES = ["Washed", "Natural", "Honey"] as const;
const ROAST_LEVELS = ["Light", "Medium", "Dark"] as const;
const BREW_METHODS = ["V60", "French Press", "Espresso", "AeroPress"] as const;

/**
 * Compute a short descriptive outcome based on user selections.
 */
function computeTasteOutcome(
	processType: string,
	roastLevel: string,
	grindLevel: number, // 0 = Fine, 100 = Coarse
	waterTemp: number,
	brewMethod: string,
	waterRatio: number
): string {
	let result = "";

	// Process Type
	switch (processType) {
		case "Washed":
			result += "Cleaner, brighter notes. ";
			break;
		case "Natural":
			result += "Fruity, sweet undertones. ";
			break;
		case "Honey":
			result += "Balanced sweetness with mild acidity. ";
			break;
	}

	// Roast Level
	switch (roastLevel) {
		case "Light":
			result += "Higher acidity, lighter body. ";
			break;
		case "Medium":
			result += "More balanced flavor. ";
			break;
		case "Dark":
			result += "Bolder with bittersweet, smoky notes. ";
			break;
	}

	// Grind Level
	if (grindLevel <= 33) {
		result += "Fine grind intensifies extraction, watch for bitterness. ";
	} else if (grindLevel <= 66) {
		result += "Medium grind yields balanced extraction. ";
	} else {
		result += "Coarse grind extracts slower, often lighter body. ";
	}

	// Water Temperature
	if (waterTemp < 90) {
		result += "Lower temp reduces acidity & sweetness. ";
	} else if (waterTemp > 95) {
		result += "Higher temp boosts extraction, potential bitterness. ";
	} else {
		result += "Moderate temp for balanced extraction. ";
	}

	// Brew Method
	switch (brewMethod) {
		case "V60":
			result += "Clarity from pour-over style. ";
			break;
		case "French Press":
			result += "Heavier body & oils from immersion. ";
			break;
		case "Espresso":
			result += "Concentrated, intense flavors with crema. ";
			break;
		case "AeroPress":
			result += "Quick brew, moderate body, flexible methods. ";
			break;
	}

	// Water Ratio
	if (waterRatio < 14) {
		result += "Strong, bold brew. ";
	} else if (waterRatio > 17) {
		result += "Lighter, delicate brew. ";
	} else {
		result += "Moderately strong cup. ";
	}

	return result.trim();
}

export default function CoffeeOutcomePage() {
	// State for user inputs
	const [processType, setProcessType] = useState<string>(PROCESS_TYPES[0]);
	const [roastLevel, setRoastLevel] = useState<string>(ROAST_LEVELS[1]);
	const [grindLevel, setGrindLevel] = useState<number>(33); // 0=Fine, 100=Coarse
	const [waterTemp, setWaterTemp] = useState<number>(93); // typical range
	const [brewMethod, setBrewMethod] = useState<string>(BREW_METHODS[0]);
	const [waterRatio, setWaterRatio] = useState<number>(16); // 1:X

	// State to show/hide the scroll to top button
	const [showScrollBtn, setShowScrollBtn] = useState(false);

	// On mount, add a scroll listener to show/hide the button
	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 100) {
				setShowScrollBtn(true);
			} else {
				setShowScrollBtn(false);
			}
		}

		window.addEventListener("scroll", handleScroll);
		// Cleanup on unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Compute outcome
	const tasteOutcome = computeTasteOutcome(
		processType,
		roastLevel,
		grindLevel,
		waterTemp,
		brewMethod,
		waterRatio
	);

	// Scroll to top handler
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<main
			className="
        relative
        min-h-[calc(100dvh-146px)] 
        w-full 
        bg-gradient-to-br from-amber-50 via-white to-amber-100
        px-4 py-6
        sm:px-6 md:px-8
      "
		>
			<section className="mx-auto max-w-2xl">
				{/* Title and short intro */}
				<h1 className="text-3xl font-bold text-center mb-2">
					Coffee Flavor Estimator
				</h1>
				<p className="text-center text-sm text-gray-700 mb-6">
					Tweak the parameters below to instantly see how they&apos;ll affect
					your brew’s flavor, body, and aroma.
				</p>

				{/* Result Card: Immediately after title */}
				<Card className="mb-6 w-full hover:shadow-lg transition-shadow duration-300">
					<CardHeader>
						<CardTitle>Predicted Taste Outcome</CardTitle>
						<CardDescription>
							A quick summary of your current selections.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-gray-800">{tasteOutcome}</p>
					</CardContent>
				</Card>

				{/* PROCESS TYPE */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="processType" className="text-sm font-medium">
						Process Type
					</Label>
					<Select
						value={processType}
						onValueChange={(val) => setProcessType(val)}
					>
						<SelectTrigger
							id="processType"
							className="w-full"
							aria-label="Process Type"
						>
							<SelectValue placeholder="Select a coffee process" />
						</SelectTrigger>
						<SelectContent>
							{PROCESS_TYPES.map((p) => (
								<SelectItem key={p} value={p}>
									{p}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-xs text-gray-500">
						Washed: clean & bright • Natural: fruity & sweet • Honey: balanced
						sweetness
					</p>
				</div>

				{/* ROAST LEVEL */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="roastLevel" className="text-sm font-medium">
						Roast Level
					</Label>
					<Select
						value={roastLevel}
						onValueChange={(val) => setRoastLevel(val)}
					>
						<SelectTrigger
							id="roastLevel"
							className="w-full"
							aria-label="Roast Level"
						>
							<SelectValue placeholder="Select a roast level" />
						</SelectTrigger>
						<SelectContent>
							{ROAST_LEVELS.map((r) => (
								<SelectItem key={r} value={r}>
									{r}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-xs text-gray-500">
						Light: bright & acidic • Medium: balanced • Dark: bold & possibly
						smoky
					</p>
				</div>

				{/* GRIND LEVEL */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="grindSlider" className="text-sm font-medium">
						Grind Level (Fine → Coarse)
					</Label>
					<Slider
						id="grindSlider"
						defaultValue={[grindLevel]}
						min={0}
						max={100}
						step={1}
						onValueChange={(val) => setGrindLevel(val[0])}
						aria-label="Grind Level Slider"
					/>
					<p className="text-xs text-gray-500">
						Current: {grindLevel} (0=Fine, 100=Coarse). Fine = more extraction,
						Coarse = less extraction
					</p>
				</div>

				{/* WATER TEMP */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="tempSlider" className="text-sm font-medium">
						Water Temperature (°C)
					</Label>
					<Slider
						id="tempSlider"
						defaultValue={[waterTemp]}
						min={80}
						max={100}
						step={1}
						onValueChange={(val) => setWaterTemp(val[0])}
						aria-label="Water Temperature Slider"
					/>
					<p className="text-xs text-gray-500">
						Current: {waterTemp}°C • &lt;90°C=less acidity/sweetness,
						&gt;95°C=stronger extraction
					</p>
				</div>

				{/* BREW METHOD */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="brewMethod" className="text-sm font-medium">
						Brew Method
					</Label>
					<Select
						value={brewMethod}
						onValueChange={(val) => setBrewMethod(val)}
					>
						<SelectTrigger
							id="brewMethod"
							className="w-full"
							aria-label="Brew Method"
						>
							<SelectValue placeholder="Select a brew method" />
						</SelectTrigger>
						<SelectContent>
							{BREW_METHODS.map((m) => (
								<SelectItem key={m} value={m}>
									{m}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-xs text-gray-500">
						V60 (clarity) • French Press (full-bodied) • Espresso (intense) •
						AeroPress (fast & flexible)
					</p>
				</div>

				{/* WATER RATIO */}
				<div className="mb-5 space-y-1">
					<Label htmlFor="ratioSlider" className="text-sm font-medium">
						Water Ratio (1:X)
					</Label>
					<Slider
						id="ratioSlider"
						defaultValue={[waterRatio]}
						min={12}
						max={20}
						step={1}
						onValueChange={(val) => setWaterRatio(val[0])}
						aria-label="Water Ratio Slider"
					/>
					<p className="text-xs text-gray-500">
						Current: 1:{waterRatio}. Lower ratio (1:12)=stronger, higher
						(1:18)=lighter
					</p>
				</div>
			</section>

			{/* Conditionally show the floating "Scroll to Top" button */}
			{showScrollBtn && (
				<Button
					variant="default"
					size="icon"
					className="
            fixed bottom-5 right-5
            w-12 h-12 rounded-full
            shadow-md
          "
					onClick={scrollToTop}
				>
					↑
				</Button>
			)}
		</main>
	);
}
