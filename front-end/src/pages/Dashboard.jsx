import React, { useEffect } from 'react'
import { getAllRecipe } from '../services/recipeService';
import { useState } from 'react';
import Card from '../components/Card';
import { useNavigate, useSearchParams } from 'react-router';

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ searchParams });
  }, [searchParams]);

  useEffect(() => {
    getAllRecipe()
      .then((data) => {
        console.log("data: ", data);
        setItems(data);
      }).catch(err => console.log(err));
  }, []);

  function handleSearch() {
    setSearchParams({ text: search });
  }

  return (
    <div>
      <div className='flex gap-5'>
        <input value={search} onChange={e => setSearch(e.target.value)} className='border-blue-400 border-2 rounded-sm p-2' type="text" placeholder='search...' />
        <button className='rounded-md bg-orange-400 text-black px-5' onClick={handleSearch}>search</button>
      </div>
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
