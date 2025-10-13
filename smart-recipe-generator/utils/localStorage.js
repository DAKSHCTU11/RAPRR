// utils/localStorage.js
export function saveRecipe(recipe) {
  const existing = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
  if (!existing.find(r => r.id === recipe.id)) {
    existing.push(recipe);
    localStorage.setItem("savedRecipes", JSON.stringify(existing));
  }
}

export function getSavedRecipes() {
  return JSON.parse(localStorage.getItem("savedRecipes") || "[]");
}

export function clearSavedRecipes() {
  localStorage.removeItem("savedRecipes");
}
