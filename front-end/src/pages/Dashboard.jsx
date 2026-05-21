import React, { useEffect } from 'react'
import { getAllRecipe } from '../services/recipeService';
import { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipe()
      .then((data) => {
        console.log("data: ", data);
        setItems(data);
      }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button
          type="button"
          onClick={() => navigate('/dashboard/add-recipe')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Add New Recipe
        </button>
      </div>
      <div className="flex justify-start flex-wrap gap-5">
        {items.map((value, idx) => {
          return <Card key={idx} data={value} />
        })}
      </div>
    </div>
  )
}
