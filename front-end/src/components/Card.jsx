import React from 'react';

export default function Card({ data }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {data.title}
        </h2>

        {/* Duration */}
        <p className="text-sm text-gray-500 mb-4">
          ⏱ {data.duration.value} {data.duration.units}
        </p>

        {/* Ingredients */}
        <h3 className="text-md font-medium text-gray-700 mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
          {data.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Action */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
          View Recipe
        </button>
      </div>
    </div>
  );
}
