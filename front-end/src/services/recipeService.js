import api from "./api";

const API_BASE_URL = "http://localhost:5000";

function withImageUrl(recipe) {
  if (!recipe) return recipe;
  if (!recipe.image) return recipe;
  if (recipe.image.startsWith("http://") || recipe.image.startsWith("https://")) {
    return recipe;
  }
  return {
    ...recipe,
    image: `${API_BASE_URL}/uploads/photos/${recipe.image}`,
  };
}

async function addRecipe(payload) {
  // If payload is FormData, set headers for multipart
  let config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  const { data } = await api.post("/recipe", payload, config);
  const response = data;
  if (response.success) {
    return withImageUrl(response.data);
  } else {
    throw new Error(response.message);
  }
}
async function getAllRecipe() {
  const { data } = await api.get("/recipe/all");
  const response = data;
  if (response.success) {
    return (response.data || []).map((item) => withImageUrl(item));
  } else {
    throw new Error(response.message);
  }
}
async function getRecipeById(id) {
  const { data } = await api.get("/recipe/"+id);
  const response = data;
  if (response.success) {
    return withImageUrl(response.data);
  } else {
    throw new Error(response.message);
  }
}
async function updateRecipe(id, payload) {
  let config = {};
  if (payload instanceof FormData) {
    config.headers = { "Content-Type": "multipart/form-data" };
  }
  const { data } = await api.put("/recipe/" + id, payload, config);
  const response = data;
  if (response.success) {
    return withImageUrl(response.data);
  } else {
    throw new Error(response.message);
  }
}
async function deleteRecipe(id) {
  const { data } = await api.delete("/recipe/" + id);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export { addRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe };
