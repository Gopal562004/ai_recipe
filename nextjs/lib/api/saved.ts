import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g. "http://localhost:5000/api"
  withCredentials: true,
});

// Save a recipe
export const saveRecipe = async (recipeData: {
  mealId: string;
  mealName: string;
  mealThumb: string;
  category?: string;
  tags?: string[];
}) => {
  const token = localStorage.getItem("token"); // get JWT token from localStorage or other storage
  const response = await API.post("/saved", recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all saved recipes for current user
export const getSavedRecipes = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/saved", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a saved recipe by mealId
export const deleteSavedRecipe = async (mealId: string) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`/saved/${mealId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
