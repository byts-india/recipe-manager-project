import React, { useState } from 'react';
import { addRecipe } from '../services/recipeService';
import { useNavigate } from 'react-router-dom';

export default function AddRecipe() {
  const [form, setForm] = useState({
    title: '',
    durationValue: '',
    durationUnits: 'minutes',
    ingredients: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('duration.value', form.durationValue);
      formData.append('duration.units', form.durationUnits);
      formData.append('ingredients', form.ingredients); // comma separated
      if (form.image) formData.append('image', form.image);

      await addRecipe(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to add recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Duration</label>
            <input type="number" name="durationValue" value={form.durationValue} onChange={handleChange} required className="w-full border px-3 py-2 rounded" min="1" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Units</label>
            <select name="durationUnits" value={form.durationUnits} onChange={handleChange} className="border px-3 py-2 rounded">
              <option value="minutes">Minutes</option>
              <option value="hour">Hour</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Ingredients (comma separated)</label>
          <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
}

//