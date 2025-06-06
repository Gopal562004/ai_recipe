"use client";
import { useState } from "react";
import PromptForm from "../../../components/PromptForm";
import { generateRecipe } from "../../../lib/api/generate-recipe";

export default function AIGenerate() {
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate(prompt: string, categories: string[]) {
    setLoading(true);
    setError(null);

    try {
      const recipe = await generateRecipe(prompt, categories);
      setGeneratedRecipe(recipe);
    } catch (err: any) {
      setError(err.response.data.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-2 max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Generate AI Recipe
      </h1>

      <PromptForm onSubmit={handleGenerate} />

      {loading && (
        <p className="mt-4 text-center text-yellow-400 font-medium">
          Generating recipe...
        </p>
      )}

      {error && (
        <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>
      )}

      {generatedRecipe && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-gray-800 dark:text-white">
          <h2 className="text-xl font-bold">{generatedRecipe.strMeal}</h2>

          {generatedRecipe.strMealThumb && (
            <img
              src={generatedRecipe.strMealThumb}
              alt={generatedRecipe.strMeal}
              className="w-full h-auto rounded-md"
            />
          )}

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {generatedRecipe.strCategory}
          </p>
          <p>
            <span className="font-semibold">Area:</span>{" "}
            {generatedRecipe.strArea}
          </p>

          <div>
            <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
            <p className="whitespace-pre-line">
              {generatedRecipe.strInstructions}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(generatedRecipe)
                .filter(
                  ([key]) =>
                    key.startsWith("strIngredient") && generatedRecipe[key]
                )
                .map(([key, value]) => (
                  <li key={key}>{String(value)}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
