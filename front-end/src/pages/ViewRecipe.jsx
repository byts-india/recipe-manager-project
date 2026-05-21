import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, } from "react-router";
import { getRecipeById, updateRecipe } from '../services/recipeService';

export default function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [newStep, setNewStep] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    durationValue: 0,
    durationUnits: "minutes",
    ingredients: "",
    imageFile: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((data) => setRecipe(data))
        .catch(err => console.log(err));
    }
  }, [id]);

  const startEditing = () => {
    if (!recipe) return;
    setEditForm({
      title: recipe.title || "",
      durationValue: recipe.duration?.value ?? 0,
      durationUnits: recipe.duration?.units || "minutes",
      ingredients: (recipe.ingredients || []).join(", "),
      imageFile: null,
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm((prev) => ({ ...prev, imageFile: files?.[0] || null }));
      return;
    }
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveRecipe = async () => {
    if (!recipe?._id) return;
    try {
      setIsSaving(true);
      const payload = new FormData();
      payload.append("title", editForm.title);
      payload.append(
        "duration",
        JSON.stringify({
          value: Number(editForm.durationValue || 0),
          units: editForm.durationUnits,
        }),
      );
      payload.append("ingredients", editForm.ingredients);
      if (editForm.imageFile) {
        payload.append("image", editForm.imageFile);
      }

      const updated = await updateRecipe(recipe._id, payload);
      setRecipe(updated);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!recipe) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-baseline justify-start py-10 px-4">
      <button className='bg-orange-300 text-black m-2 p-2 px-7 rounded-md shadow-md shadow-gray-600 font-bold q4' onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="flex justify-around items-baseline align-baseline space-x-10 gap-10">
        {/* Recipe Card */}
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
          <div className="p-6 pt-0">
            {isEditing ? (
              <div className="space-y-3 mt-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="number"
                      min="0"
                      name="durationValue"
                      value={editForm.durationValue}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                    <select
                      name="durationUnits"
                      value={editForm.durationUnits}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="minutes">minutes</option>
                      <option value="hour">hour</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={editForm.ingredients}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="onion, tomato, salt"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleEditChange}
                    className="w-full text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveRecipe}
                    disabled={isSaving}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start gap-3 mt-4">
                  <h1 className="text-3xl font-bold text-orange-700 mb-2">{recipe.title}</h1>
                  <button
                    onClick={startEditing}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit Recipe
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  ⏱ {recipe.duration?.value ?? 0} {recipe.duration?.units || "minutes"}
                </p>
              </>
            )}
            <h2 className="text-xl font-semibold text-orange-600 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
              {(recipe.ingredients || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps Section */}
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Steps</h2>
          <ul className="space-y-4 mb-6">
            {(recipe.steps || []).map((step) => (
              <li key={step._id} className="flex justify-between items-center bg-orange-50 p-3 rounded-md">
                <div>
                  <p className="text-gray-800 font-medium">Step {step.order}</p>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button

                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button

                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Add Step */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Add new step..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button

              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
