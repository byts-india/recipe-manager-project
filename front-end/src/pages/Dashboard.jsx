import React, { useEffect } from 'react'
import { getAllRecipe } from '../services/recipeService';
import { useState } from 'react';
import Card from '../components/Card';

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllRecipe()
      .then((data) => {
        console.log("data: ", data);
        setItems(data);
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className="">
      {items.map((value, idx) => {
        return <Card key={idx} data={value} />
      })}
    </div>
  )
}
