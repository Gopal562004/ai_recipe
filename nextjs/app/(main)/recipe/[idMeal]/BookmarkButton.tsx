"use client";

import { useState } from "react";
import { saveRecipe } from "@/lib/api/saved"; // adjust path

type Recipe = {
  mealId: string;
  mealName: string;
  mealThumb: string;
  category?: string;
  tags?: string[];
};

export function BookmarkButton({ recipe }: { recipe: Recipe }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (saved) return;
    setLoading(true);
    try {
      await saveRecipe(recipe);
      setSaved(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      aria-label={saved ? "Recipe saved" : "Save recipe"}
      title={saved ? "Recipe saved" : "Save recipe"}
      className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-default"
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <svg
          className="animate-spin text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : saved ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
          width="20"
          height="20"
          className="text-green-600"
        >
          <path d="M5 3a2 2 0 00-2 2v16l7-5 7 5V5a2 2 0 00-2-2H5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="text-gray-600 dark:text-gray-300"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      )}
    </button>
  );
}
