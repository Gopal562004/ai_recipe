import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // just the base URL
  withCredentials: true,
});

export const generateRecipe = async (
  prompt: string,
  categories: string[] = []
) => {
  try {
    const response = await API.post("/ai/generate-recipe", {
      prompt,
      categories,
    });

    //console.log(response.data); // optional for debugging
    return response.data.recipe;
  } catch (error: any) {
    console.error(
      "Error generating recipe:",
      error.response?.error || error.message
    );
    throw error;
  }
};
