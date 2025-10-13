// /services/visionClient.js
/**
 * Mock Vision Client — works without Google Vision API.
 * Detects ingredients from image filename or randomly simulates results.
 */

const knownFoods = [
  "tomato",
  "chicken",
  "egg",
  "onion",
  "garlic",
  "pasta",
  "bread",
  "cheese",
  "rice",
  "lemon",
  "potato",
  "milk",
  "butter",
  "carrot",
  "paneer",
  "fish",
  "shrimp",
  "broccoli",
  "cucumber",
  "banana"
];

/**
 * detectLabelsMock(file)
 * Simulates food detection from image file name.
 * Returns [{ name, confidence }] array.
 */
export async function detectLabelsMock(file) {
  const fname = file.name.toLowerCase();
  const detected = [];

  // Match known foods in filename
  for (const food of knownFoods) {
    if (fname.includes(food)) {
      detected.push({ name: food, confidence: 0.9 });
    }
  }

  // If none matched, simulate 2-3 common foods
  if (detected.length === 0) {
    const randoms = ["tomato", "garlic", "onion", "pasta", "rice", "chicken"];
    const picks = randoms.sort(() => 0.5 - Math.random()).slice(0, 2);
    picks.forEach(p =>
      detected.push({ name: p, confidence: Math.random() * 0.3 + 0.6 })
    );
  }

  // Simulate a network delay
  await new Promise(r => setTimeout(r, 800));

  return detected;
}

/**
 * (Optional) Real Vision API version — only runs if key is provided.
 */
export async function detectLabelsVision(file, visionKey) {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  const body = {
    requests: [
      {
        image: { content: base64 },
        features: [{ type: "LABEL_DETECTION", maxResults: 10 }]
      }
    ]
  };

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${visionKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const json = await res.json();
  const labels =
    json.responses?.[0]?.labelAnnotations?.map(l => ({
      name: l.description.toLowerCase(),
      confidence: l.score
    })) || [];

  return labels;
}

/**
 * Auto-detect which to use
 */
export async function detectLabels(file, visionKey) {
  if (!visionKey) {
    return detectLabelsMock(file);
  } else {
    return detectLabelsVision(file, visionKey);
  }
}
