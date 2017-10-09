export function getRecipeId() {
  const queryString = new URLSearchParams(window.location.search);

  const recipeId = queryString.get('recipe_id');

  if (!recipeId) {
    throw new Error('Please provide recipe_id query string');
  }

  return recipeId;
}
