"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SavedRecipeCard from "../../../components/SavedRecipeCard";
import { getSavedRecipes, deleteSavedRecipe } from "../../../lib/api/saved";

type Recipe = {
  _id: string;
  mealId: string;
  mealName: string;
  mealThumb: string;
  category?: string;
  tags?: string[];
};

export default function SavedRecipes() {
  const router = useRouter();

  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check login on client side
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if no token found
      router.push("/login");
      return;
    }

    async function fetchSavedRecipes() {
      setLoading(true);
      setError(null);
      try {
        const data = await getSavedRecipes();
        setSavedRecipes(data);
      } catch (err) {
        setError("Failed to load saved recipes.");
      } finally {
        setLoading(false);
      }
    }

    fetchSavedRecipes();
  }, [router]);

  async function handleRemove(mealId: string) {
    try {
      await deleteSavedRecipe(mealId);
      setSavedRecipes((prev) =>
        prev.filter((recipe) => recipe.mealId !== mealId)
      );
    } catch (err) {
      alert("Failed to remove recipe.");
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading saved recipes...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 md:text-center">Saved Recipes</h1>

      {savedRecipes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No saved recipes yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {savedRecipes.map((recipe) => (
            <SavedRecipeCard
              key={recipe._id}
              recipe={{
                id: recipe.mealId,
                title: recipe.mealName,
                imageUrl: recipe.mealThumb,
                tags: recipe.tags,
              }}
              onRemove={() => handleRemove(recipe.mealId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
