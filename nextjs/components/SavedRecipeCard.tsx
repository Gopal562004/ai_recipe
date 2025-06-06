import Link from "next/link";

type SavedRecipeCardProps = {
  recipe: {
    id: string | number;
    title: string;
    imageUrl: string;
    tags?: string[];
  };
  onRemove?: (id: string | number) => void;
};

export default function SavedRecipeCard({
  recipe,
  onRemove,
}: SavedRecipeCardProps) {
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-3 border border-gray-200 dark:border-gray-700">
      {/* Wrap image and text in a Link to recipe detail page */}
      <Link
        href={`/recipe/${recipe.id}`}
        className="flex flex-1 items-center space-x-4 cursor-pointer"
        passHref
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">
            {recipe.title}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {recipe.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={() => onRemove(recipe.id)}
          className="ml-4 text-red-500 hover:text-red-600 transition m-1"
          aria-label="Remove saved recipe"
          title="Remove"
        >
          &#10005;
        </button>
      )}
    </div>
  );
}
