// /components/RecipeCard.jsx
import React from "react";
import Link from "next/link";

export default function RecipeCard({ result }) {
  const { recipe, score, missing, usedSubstitutions } = result;

  return (
    <div className="border p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <span className="text-sm text-gray-600">Score: {score}</span>
      </div>
      <p className="text-sm text-gray-500">
        ⏱️ {recipe.cooking_time} min | {recipe.difficulty}
      </p>

      <div className="mt-2">
        <strong>Missing:</strong>{" "}
        {missing.length ? missing.join(", ") : "None"}
      </div>
      {usedSubstitutions.length > 0 && (
        <div className="text-sm text-green-600">
          {usedSubstitutions.map((s, i) => (
            <p key={i}>Used {s.using} instead of {s.missing}</p>
          ))}
        </div>
      )}

      <Link
        href={`/recipe/${recipe.id}`}
        className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded mt-3"
      >
        View Recipe
      </Link>
    </div>
  );
}
