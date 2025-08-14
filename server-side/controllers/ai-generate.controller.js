const fetch = require("node-fetch");

const GEMINI_API_KEY =
  process.env.GEMINI_API || "AIzaSyC4LgzklWXLSvrSDUvP8pNTL9lZDSR7up0";

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
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return res
        .status(500)
        .json({ message: "API Error", error: result.error });
    }

    const rawText =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Match all JSON blocks in the response
    const allJsonBlocks = [...rawText.matchAll(/\{[\s\S]*?\}/g)];

    if (allJsonBlocks.length === 0) {
      return res.status(500).json({
        message: "No valid JSON found in AI response",
        rawText,
      });
    }

    // Use the last JSON block
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
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = { generateRecipe };
