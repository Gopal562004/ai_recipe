"use client";
import { useState } from "react";

const categories = [
  "Chicken",
  "Vegetarian",
  "Vegan",
  "30 min",
  "Easy",
  "Dessert",
  "Gluten-Free",
  "Low Carb",
];

type PromptFormProps = {
  onSubmit: (prompt: string, categories: string[]) => void;
};

export default function PromptForm({ onSubmit }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, selectedCategories);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        What would you like to cook?
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter ingredients, recipe idea, or instructions..."
        rows={5}
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <div className="mt-4">
        <p className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
          Select categories (optional):
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = selectedCategories.includes(category);
            return (
              <button
                type="button"
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    selected
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={!prompt.trim()}
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Generate Recipe
      </button>
    </form>
  );
}
