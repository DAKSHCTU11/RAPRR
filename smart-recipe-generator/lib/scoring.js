// /lib/scoring.js
import { substitutionMap } from "./substitutions";

/**
 * Calculates a score for a recipe based on user ingredients.
 * +2 points for essential matches
 * +1 for secondary matches
 * -3 for missing essential
 * partial credit for substitutions
 */
export function scoreRecipe(recipe, userIngredients) {
  const userSet = new Set(userIngredients.map(i => i.toLowerCase().trim()));
  let score = 0;
  const missing = [];
  const usedSubstitutions = [];

  for (const ing of recipe.ingredients) {
    const name = ing.name.toLowerCase();
    const essential = !!ing.essential;

    if (userSet.has(name)) {
      score += essential ? 2 : 1;
    } else {
      // check substitution
      const subs = substitutionMap[name] || [];
      const matchedSub = subs.find(sub => {
        const parts = sub.split(/\+|,/).map(p => p.trim().toLowerCase());
        return parts.every(p => userSet.has(p));
      });

      if (matchedSub) {
        score += essential ? 1 : 0.5;
        usedSubstitutions.push({ missing: name, using: matchedSub });
      } else {
        if (essential) {
          score -= 3;
          missing.push(name);
        } else {
          score -= 0.5;
        }
      }
    }
  }

  return { score, missing, usedSubstitutions };
}

export function scoreAll(recipes, userIngredients) {
  return recipes
    .map(r => ({ ...scoreRecipe(r, userIngredients), recipe: r }))
    .sort((a, b) => b.score - a.score);
}
