// tests/scoring.test.js
import { calculateRecipeScore } from "../lib/scoring.js";

const sampleRecipe = {
  title: "Test Recipe",
  ingredients: [
    { name: "chicken", essential: true },
    { name: "onion", essential: false },
    { name: "garlic", essential: false },
    { name: "spices", essential: true }
  ]
};

describe("calculateRecipeScore", () => {
  test("returns high score when all ingredients are available", () => {
    const { score, missingEssentials } = calculateRecipeScore(sampleRecipe, [
      "chicken",
      "onion",
      "garlic",
      "spices"
    ]);
    expect(score).toBe(6); // +2 (chicken) +1 (onion) +1 (garlic) +2 (spices)
    expect(missingEssentials.length).toBe(0);
  });

  test("penalizes for missing essential ingredients", () => {
    const { score, missingEssentials } = calculateRecipeScore(sampleRecipe, ["chicken"]);
    expect(score).toBe(-1); // +2 (chicken) -3 (spices)
    expect(missingEssentials).toContain("spices");
  });

  test("handles case-insensitive ingredient names", () => {
    const { score } = calculateRecipeScore(sampleRecipe, ["Chicken", "Spices"]);
    expect(score).toBe(4); // +2 +2
  });

  test("returns correct score when only non-essential ingredients match", () => {
    const { score } = calculateRecipeScore(sampleRecipe, ["onion", "garlic"]);
    expect(score).toBe(2); // +1 +1
  });
});
