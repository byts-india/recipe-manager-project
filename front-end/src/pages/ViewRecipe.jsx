import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getRecipeById } from '../services/recipeService';

export default function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [newStep, setNewStep] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((data) => setRecipe(data))
        .catch(err => console.log(err));
    }
  }, [id]);

  if (!recipe) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-10 px-4">
      <div className="flex justify-between space-x-10 gap-10">
        
        {/* Recipe Card */}
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-orange-700 mb-2">{recipe.title}</h1>
            <p className="text-gray-600 mb-4">
              ⏱ {recipe.duration.value} {recipe.duration.units}
            </p>
            <h2 className="text-xl font-semibold text-orange-600 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps Section */}
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Steps</h2>
          <ul className="space-y-4 mb-6">
            {recipe.steps.map((step) => (
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
