import api from "./api";

async function addStep(payload) {
  const { data } = await api.post("/steps", payload);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

async function getAllSteps() {
  const { data } = await api.get("/steps/all");
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

async function getStepById(id) {
  const { data } = await api.get("/steps/" + id);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

async function updateStep(id, payload) {
  const { data } = await api.put("/steps/" + id, payload);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

async function deleteStep(id) {
  const { data } = await api.delete("/steps/" + id);
  const response = data;
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export { addStep, getAllSteps, getStepById, updateStep, deleteStep };
