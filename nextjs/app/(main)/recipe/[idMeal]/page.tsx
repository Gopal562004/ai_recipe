import { notFound } from "next/navigation";
import { BookmarkButton } from "./BookmarkButton";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function fetchMealDetail(idMeal: string) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { idMeal: string };
}) {
  const meal = await fetchMealDetail(params.idMeal);
  if (!meal) return notFound();

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient && ingredient.trim()
      ? `${measure?.trim() || ""} ${ingredient.trim()}`
      : null;
  }).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 dark:text-white">
      {/* Title and Bookmark Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left flex-1">
          {meal.strMeal}
        </h1>
        <BookmarkButton
          recipe={{
            mealId: meal.idMeal,
            mealName: meal.strMeal,
            mealThumb: meal.strMealThumb,
            category: meal.strCategory,
            tags: meal.strTags ? meal.strTags.split(",") : [],
          }}
        />
      </div>

      {/* Image and Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />

        <div className="space-y-4">
          <div>
            <span className="text-sm font-semibold text-gray-500 uppercase">
              Category
            </span>
            <p className="text-xl font-medium">{meal.strCategory}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500 uppercase">
              Cuisine
            </span>
            <p className="text-xl font-medium">{meal.strArea}</p>
          </div>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
            >
              ▶ Watch Video
            </a>
          )}
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <p className="whitespace-pre-line text-base leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
}
