"use client";

import React, { useState } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

// -----------------------------------
// Types & Data
// -----------------------------------
type Recipe = {
	id: string;
	label: string;
	description: string;
	steps: (params: { coffee: number; water: number; ratio: number }) => string[];
	tips?: (params: { coffee: number; water: number; ratio: number }) => string[];
};

const RECIPES: Recipe[] = [
	{
		id: "4-6",
		label: "Hario V60 4:6 Method",
		description:
			"The 4:6 method by Tetsu Kasuya divides the brew into two parts: sweetness and strength. Adjust water pours and intervals based on your taste preferences.",
		steps: ({ coffee, water, ratio }) => {
			const bloomWater = Math.round(coffee * 2);
			const sweetnessWater = Math.round((water - bloomWater) * 0.4);
			const strengthWater = water - bloomWater - sweetnessWater;

			return [
				`Bloom: Pour ~${bloomWater}ml water for 30-45 seconds.`,
				`Sweetness phase: Pour ~${sweetnessWater}ml water, wait ~45-60 seconds.`,
				`Strength phase: Pour ~${strengthWater}ml water in increments.`,
				`Total brew time: ~2:30 - 3:00 minutes.`,
			];
		},
		tips: ({ ratio }) => {
			const tipsArray: string[] = [
				"Increase the sweetness phase (50-60%) to emphasize sweetness.",
				"Decrease the sweetness phase (30-35%) if you want brighter or more acidic flavors.",
				"Swirl or stir lightly after each pour for even extraction.",
			];

			if (ratio < 15) {
				tipsArray.push(
					`Your ratio (1:${ratio}) is quite strong. You could add more water in the sweetness phase to balance any bitterness.`
				);
			} else if (ratio > 16) {
				tipsArray.push(
					`Your ratio (1:${ratio}) is lighter. Slowing down pours or reducing the sweetness water may preserve complexity.`
				);
			}

			return tipsArray;
		},
	},
	{
		id: "james-hoffmann",
		label: "James Hoffmann Method",
		description:
			"A method focusing on swirling or agitation for even extraction. Timings and pours are crucial for optimal flavor.",
		steps: ({ coffee, water }) => {
			const bloomWater = Math.round(coffee * 2);
			const mainPour = Math.round(water * 0.6);
			const finalPour = water - bloomWater - mainPour;

			return [
				`Bloom: Pour ~${bloomWater}ml water, swirl gently (30-45s).`,
				`Main pour: Pour until ~${mainPour}ml total. Swirl again.`,
				`Final pour: Add remaining ~${finalPour}ml water. Swirl once more.`,
				`Total brew time: ~3:00 - 3:30 minutes.`,
			];
		},
	},
];

// -----------------------------------
// Main Component
// -----------------------------------
export default function CoffeeRecipesPage() {
	const [selectedMethod, setSelectedMethod] = useState<string>(RECIPES[0].id);
	const [coffeeGrams, setCoffeeGrams] = useState<number>(15);
	const [waterMl, setWaterMl] = useState<number>(240);
	const [ratio, setRatio] = useState<number>(16);

	// Current selected recipe
	const currentRecipe = RECIPES.find((r) => r.id === selectedMethod);

	// Handlers
	const handleCoffeeChange = (value: number) => {
		setCoffeeGrams(value);
		setWaterMl(Math.round(value * ratio));
	};

	const handleWaterChange = (value: number) => {
		setWaterMl(value);
		setCoffeeGrams(Math.round(value / ratio));
	};

	const handleRatioChange = (value: number) => {
		setRatio(value);
		setWaterMl(Math.round(coffeeGrams * value));
	};

	return (
		<div
			className="
        min-h-[calc(100dvh-146px)] w-full
        bg-gradient-to-tr from-amber-50 via-white to-amber-100
        p-6
        animate-in fade-in slide-in-from-bottom-10
      "
		>
			<div className="mx-auto max-w-xl">
				<h1 className="text-3xl font-bold text-center">Drip Coffee Recipes</h1>
				<p className="mt-2 text-center text-sm text-gray-600">
					Explore different methods, adjust parameters, and brew the perfect
					cup.
				</p>

				{/* Brew Method Selector */}
				<div className="mt-6 space-y-1">
					<Label htmlFor="method" className="text-sm font-medium">
						Brew Method
					</Label>
					<Select
						value={selectedMethod}
						onValueChange={(value) => setSelectedMethod(value)}
					>
						<SelectTrigger
							id="method"
							className="w-full"
							aria-label="Brew Method Select"
						>
							<SelectValue placeholder="Choose a brew method" />
						</SelectTrigger>
						<SelectContent>
							{RECIPES.map((recipe) => (
								<SelectItem key={recipe.id} value={recipe.id}>
									{recipe.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{currentRecipe && (
						<p className="mt-3 text-sm text-gray-600">
							{currentRecipe.description}
						</p>
					)}
				</div>

				{/* Card: coffee, water, ratio inputs */}
				<Card className="mt-6 shadow-sm">
					<CardHeader>
						<CardTitle className="text-base">Adjust Your Parameters</CardTitle>
						<CardDescription>
							Enter coffee grams, water, and ratio below.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Coffee */}
						<div>
							<Label htmlFor="coffee" className="block text-sm font-medium">
								Coffee (grams)
							</Label>
							<Input
								id="coffee"
								type="number"
								className="mt-1"
								value={coffeeGrams}
								onChange={(e) => handleCoffeeChange(Number(e.target.value))}
							/>
						</div>
						{/* Water */}
						<div>
							<Label htmlFor="water" className="block text-sm font-medium">
								Water (ml)
							</Label>
							<Input
								id="water"
								type="number"
								className="mt-1"
								value={waterMl}
								onChange={(e) => handleWaterChange(Number(e.target.value))}
							/>
						</div>
						{/* Ratio */}
						<div>
							<Label htmlFor="ratio" className="block text-sm font-medium">
								Ratio (1: X)
							</Label>
							<Input
								id="ratio"
								type="number"
								className="mt-1"
								value={ratio}
								onChange={(e) => handleRatioChange(Number(e.target.value))}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Quick summary card */}
				<Card className="mt-4 shadow-sm animate-in fade-in slide-in-from-bottom-5">
					<CardContent>
						<p className="text-sm text-gray-800">
							With <strong>{coffeeGrams}g</strong> of coffee and a ratio of{" "}
							<strong>1:{ratio}</strong>, you&apos;ll use about{" "}
							<strong>{waterMl}ml</strong> of water.
						</p>
					</CardContent>
				</Card>

				{/* Dialog: Start Brewing -> show dynamic steps & tips */}
				<div className="mt-6 flex justify-center">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="shadow-md hover:shadow-lg">
								Start Brewing
							</Button>
						</DialogTrigger>
						<DialogContent className="animate-in fade-in slide-in-from-bottom-5">
							<DialogHeader>
								<DialogTitle>{currentRecipe?.label} Instructions</DialogTitle>
								<DialogDescription>
									Follow these steps carefully to brew.
								</DialogDescription>
							</DialogHeader>

							{currentRecipe && (
								<div className="text-sm">
									<h2 className="mt-4 font-semibold">Steps</h2>
									<ul className="mt-2 list-disc space-y-2 pl-5">
										{currentRecipe
											.steps({
												coffee: coffeeGrams,
												water: waterMl,
												ratio: ratio,
											})
											.map((step, i) => (
												<li key={i}>{step}</li>
											))}
									</ul>

									{currentRecipe.tips && (
										<>
											<h2 className="mt-6 font-semibold">Tips</h2>
											<ul className="mt-2 list-disc space-y-2 pl-5">
												{currentRecipe
													.tips({
														coffee: coffeeGrams,
														water: waterMl,
														ratio: ratio,
													})
													.map((tip, i) => (
														<li key={i}>{tip}</li>
													))}
											</ul>
										</>
									)}
								</div>
							)}
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
