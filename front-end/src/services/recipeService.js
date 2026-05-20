import api from "./api";

async function addRecipe(payload) {
  const { data } = await api.post("/recipe", payload);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}
async function getAllRecipe() {
  const { data } = await api.get("/recipe/all");
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}
async function getRecipeById(id) {
  const { data } = await api.get("/recipe/id");
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}
async function updateRecipe(payload) {
  const { data } = await api.put("/recipe", payload);
  const response = data;
  if (response.success) {
    return response.data;
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
