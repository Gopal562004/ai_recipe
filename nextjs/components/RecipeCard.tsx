import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .slice(0, 3)
    .map((key) => recipe[key]);

  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <div className="cursor-pointer max-w-sm bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <img
          className="w-full h-48 object-cover"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {recipe.strMeal}
          </h2>

          <div className="flex flex-wrap gap-2 mb-2">
            {recipe.strCategory && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {recipe.strCategory}
              </span>
            )}
            {recipe.strArea && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {recipe.strArea}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {recipe.strInstructions}
          </div>

          <div className="text-sm text-blue-600 hover:underline font-medium">
            More Details
          </div>
        </div>
      </div>
    </Link>
  );
}
