// /pages/recipe/[id].jsx
"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch("/recipes.json")
      .then(res => res.json())
      .then(data => setRecipe(data.find(r => r.id === id)));
  }, [id]);

  if (!recipe) return <p className="p-4">Loading recipe...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => router.back()} className="text-blue-500 mb-4">← Back</button>
      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">
        ⏱️ {recipe.cooking_time} min | {recipe.difficulty}
      </p>

      <h2 className="text-lg font-semibold">Ingredients:</h2>
      <ul className="list-disc ml-5 mb-4">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i.name}</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">Steps:</h2>
      <ol className="list-decimal ml-5 mb-4">
        {recipe.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>

      <h2 className="text-lg font-semibold">Nutritional Info:</h2>
      <p>Calories: {recipe.nutrition.calories}</p>
      <p>Protein: {recipe.nutrition.protein}g | Carbs: {recipe.nutrition.carbs}g | Fat: {recipe.nutrition.fat}g</p>
    </div>
  );
}
