// /pages/index.jsx
"use client";
import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import RecipeCard from "../components/RecipeCard";
import { scoreAll } from "../lib/scoring";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/recipes.json")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  useEffect(() => {
    if (recipes.length && ingredients.length) {
      setResults(scoreAll(recipes, ingredients));
    }
  }, [recipes, ingredients]);

  function addIngredient(ing) {
    const clean = ing.trim().toLowerCase();
    if (clean && !ingredients.includes(clean)) {
      setIngredients([...ingredients, clean]);
    }
  }

  function removeIngredient(i) {
    setIngredients(ingredients.filter(x => x !== i));
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🧠 Smart Recipe Generator
      </h1>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter ingredient..."
          className="border p-2 rounded w-full"
          onKeyDown={e => e.key === "Enter" && addIngredient(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={() => addIngredient(prompt("Enter ingredient:"))}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {ingredients.map((i, idx) => (
          <span
            key={idx}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
            onClick={() => removeIngredient(i)}
          >
            {i} ✕
          </span>
        ))}
      </div>

      <ImageUploader
        onIngredientsDetected={detected => {
          const all = [...ingredients, ...detected];
          setIngredients([...new Set(all)]);
        }}
      />

      <hr className="my-5" />
      <h2 className="text-xl font-semibold mb-2">Recommended Recipes</h2>

      {results.length ? (
        results.map((res, idx) => <RecipeCard key={idx} result={res} />)
      ) : (
        <p className="text-gray-600">Enter ingredients or upload an image to start!</p>
      )}
    </div>
  );
}
