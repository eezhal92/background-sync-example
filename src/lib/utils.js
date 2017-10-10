export function getRecipeId() {
  const hash = window.location.hash;
  const match = /\d+/.exec(hash);

  const recipeId = match[0];

  if (!recipeId) {
    throw new Error('Please provide recipe_id query string');
  }

  return recipeId;
}
