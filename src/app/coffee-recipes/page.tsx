"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		tips: ({ coffee, water, ratio }) => {
			const tipsArray: string[] = [];

			// General sweetness/strength suggestions
			tipsArray.push(
				"Increase the sweetness phase (e.g. 50-60% of remaining water) to emphasize sweetness.",
				"Decrease the sweetness phase (30-35%) if you want brighter or more acidic flavors.",
				"Swirling or stirring lightly after each pour can help with even extraction."
			);

			// Some dynamic advice based on ratio
			if (ratio < 15) {
				tipsArray.push(
					`Your ratio (1:${ratio}) is quite strong. You might try pouring more water in the sweetness phase to balance potential bitterness.`
				);
			} else if (ratio > 16) {
				tipsArray.push(
					`Your ratio (1:${ratio}) is lighter. Slowing down pours or reducing total sweetness water may help preserve flavor complexity.`
				);
			}

			return tipsArray;
		},
	},
	{
		id: "jeff-hoffmand",
		label: "Jeff Hoffmand Method",
		description:
			"A method focusing on a swirl or agitation technique for even extraction. Specific pours and timings are crucial.",
		steps: ({ coffee, water, ratio }) => {
			const bloomWater = Math.round(coffee * 2);
			const mainPour = Math.round(water * 0.6);
			const finalPour = water - bloomWater - mainPour;

			return [
				`Bloom: Pour ~${bloomWater}ml water, swirl gently (30-45s).`,
				`Main pour: Pour water until ~${mainPour}ml total. Swirl again.`,
				`Final pour: Add remaining ~${finalPour}ml water. Swirl once more.`,
				`Total brew time: ~3:00 - 3:30 minutes.`,
			];
		},
		// no dynamic tips for this method
	},
	{
		id: "custom",
		label: "Custom Drip",
		description:
			"A generic drip coffee approach. Feel free to experiment with different ratios and pouring schedules.",
		steps: ({ coffee, water, ratio }) => {
			const bloomWater = Math.round(coffee * 2);
			return [
				`Bloom: Use ~${bloomWater}ml water, ~30 seconds bloom.`,
				`Second pour: Add water until about half the total (${Math.round(
					water / 2
				)}ml).`,
				`Third pour: Pour the remaining water. Keep a steady flow.`,
			];
		},
	},
];

export default function CoffeeRecipesPage() {
	const [selectedMethod, setSelectedMethod] = useState<string>(RECIPES[0].id);
	const [coffeeGrams, setCoffeeGrams] = useState<number>(15);
	const [waterMl, setWaterMl] = useState<number>(240);
	const [ratio, setRatio] = useState<number>(16);

	const currentRecipe = RECIPES.find((r) => r.id === selectedMethod);

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
		<div className="mx-auto mt-10 max-w-xl p-4">
			<h1 className="text-2xl font-bold">Drip Coffee Recipes</h1>

			{/* Brew Method Selector */}
			<div className="mt-6">
				<label htmlFor="method" className="block text-sm font-medium">
					Brew Method
				</label>
				<select
					id="method"
					className="mt-1 block w-full rounded-md border p-2 text-sm"
					value={selectedMethod}
					onChange={(e) => setSelectedMethod(e.target.value)}
				>
					{RECIPES.map((recipe) => (
						<option key={recipe.id} value={recipe.id}>
							{recipe.label}
						</option>
					))}
				</select>
			</div>

			{/* Method Description */}
			{currentRecipe && (
				<p className="mt-4 text-sm text-gray-600">
					{currentRecipe.description}
				</p>
			)}

			{/* Inputs for coffee / water / ratio */}
			<div className="mt-6 flex flex-col gap-4">
				{/* Coffee */}
				<div>
					<label htmlFor="coffee" className="block text-sm font-medium">
						Coffee (grams)
					</label>
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
					<label htmlFor="water" className="block text-sm font-medium">
						Water (ml)
					</label>
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
					<label htmlFor="ratio" className="block text-sm font-medium">
						Ratio (1: X)
					</label>
					<Input
						id="ratio"
						type="number"
						className="mt-1"
						value={ratio}
						onChange={(e) => handleRatioChange(Number(e.target.value))}
					/>
				</div>
			</div>

			{/* Quick summary */}
			<div className="mt-6 rounded-md border p-4">
				<p className="text-sm">
					With <strong>{coffeeGrams}g</strong> of coffee and a ratio of{" "}
					<strong>1:{ratio}</strong>, you’ll use about{" "}
					<strong>{waterMl}ml</strong> of water.
				</p>
			</div>

			{/* Dialog: Start Brewing -> show dynamic steps & tips */}
			<div className="mt-6 text-center">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Start Brewing</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{currentRecipe?.label} Instructions</DialogTitle>
							<DialogDescription>
								Follow these steps carefully to brew.
							</DialogDescription>
						</DialogHeader>

						{/* Steps */}
						{currentRecipe && (
							<div className="text-sm">
								<h2 className="mt-2 font-semibold">Steps</h2>
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

								{/* Tips (if present) */}
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
	);
}
