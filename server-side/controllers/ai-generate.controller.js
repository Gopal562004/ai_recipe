const fetch = require("node-fetch");

const HUGGINGFACE_API_TOKEN = process.env.HUGGING_API;

const generateRecipe = async (req, res) => {
  const { prompt, categories = [] } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const fullPrompt = `
You are a helpful AI that generates recipes.

User Input: "${prompt}"
Categories: ${categories.join(", ")}

Provide a recipe in this JSON format:
{
  "idMeal": "unique_id",
  "strMeal": "Recipe Title",
  "strMealThumb": "Image URL",
  "strCategory": "Category",
  "strArea": "Origin",
  "strInstructions": "Step-by-step detailed instructions for cooking the recipe. Explain each step clearly as if teaching a beginner.",
  "strIngredient1": "...",
  "strIngredient2": "...",
  "strIngredient3": "..."
}
Only return JSON.

Example:
{
  "idMeal": "123",
  "strMeal": "Chicken and Rice with Indian Spices",
  "strMealThumb": "https://www.example.com/chicken-spice-rice.jpg",
  "strCategory": "Chicken, Easy, 30 min",
  "strArea": "Indian",
  "strInstructions": "1. Cook rice according to package directions...",
  "strIngredient1": "1 lb boneless, skinless chicken breast",
  "strIngredient2": "1 cup basmati rice",
  "strIngredient3": "1 tablespoon oil"
}
`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: fullPrompt }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return res
        .status(500)
        .json({ message: "API Error", error: result.error });
    }

    const rawText = result?.[0]?.generated_text || "";

    // Match all JSON blocks in the response
    const allJsonBlocks = [...rawText.matchAll(/\{[\s\S]*?\}/g)];

    if (allJsonBlocks.length === 0) {
      return res.status(500).json({
        message: "No valid JSON found in AI response",
        rawText,
      });
    }

    // Use the last JSON block (usually the example one)
    const jsonText = allJsonBlocks[allJsonBlocks.length - 1][0];

    let recipe;
    try {
      recipe = JSON.parse(jsonText);
    } catch (err) {
      return res.status(500).json({
        message: "Failed to parse extracted JSON",
        rawText: jsonText,
        error: err.message,
      });
    }

    return res.status(200).json({ recipe });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { generateRecipe };
