const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchFromMealDBMultiple(count: number = 6) {
  try {
    const requests = Array.from({ length: count }, () =>
      fetch(`${BASE_URL}/random.php`).then((res) => res.json())
    );

    const results = await Promise.all(requests);
    const meals = results.flatMap((res) => res.meals || []);
    return { meals };
  } catch (error) {
    console.error("TheMealDB API error:", error);
    throw error;
  }
}


// fetchFromMealDBSearch
export async function fetchFromMealDBSearch(query: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
