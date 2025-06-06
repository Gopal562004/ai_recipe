"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { fetchFromMealDBMultiple, fetchFromMealDBSearch } from "../lib/api/api";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCategory?: string;
};

type MealResponse = {
  meals: Meal[] | null;
};

export default function RecipeList({ searchTerm }: { searchTerm: string }) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // If there's a search term, use search query
  const { data, status } = useQuery<MealResponse>({
    queryKey: ["recipes", searchTerm],
    queryFn: () => fetchFromMealDBSearch(searchTerm),
    enabled: !!searchTerm, // only run when searchTerm is non-empty
  });

  // Otherwise, show infinite random recipes
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: infiniteStatus,
  } = useInfiniteQuery<MealResponse>({
    queryKey: ["recipes"],
    queryFn: async () => await fetchFromMealDBMultiple(6),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      return allPages.length < 10 ? allPages.length + 1 : undefined;
    },
    enabled: !searchTerm, // only run when searchTerm is empty
  });

  useEffect(() => {
    if (!observerRef.current || searchTerm) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchTerm]);

  const renderRecipes = () => {
    if (searchTerm) {
      if (status === "pending")
        return <p className="text-white text-center">Searching...</p>;
      if (status === "error" || !data?.meals)
        return <p className="text-red-500 text-center">No recipes found.</p>;

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.meals.map((meal) => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))}
        </div>
      );
    } else {
      if (infiniteStatus === "pending")
        return <p className="text-white text-center">Loading...</p>;
      if (infiniteStatus === "error")
        return (
          <p className="text-red-500 text-center">Failed to load recipes.</p>
        );

      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {infiniteData?.pages.map((page, pageIndex) =>
              page.meals?.map((meal) => (
                <RecipeCard key={meal.idMeal + "-" + pageIndex} recipe={meal} />
              ))
            )}
          </div>
          <div
            ref={observerRef}
            className="h-16 flex justify-center items-center"
          >
            {isFetchingNextPage && (
              <p className="text-gray-500">Loading more...</p>
            )}
            {!hasNextPage && <p className="text-gray-400">No more recipes</p>}
          </div>
        </>
      );
    }
  };

  return <div className="px-4 py-8">{renderRecipes()}</div>;
}
