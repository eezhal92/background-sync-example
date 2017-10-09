const BASE_API_ENDPOINT = `https://resepku-api.herokuapp.com`;

export function getRecipes() {
  return fetch(`${BASE_API_ENDPOINT}/recipes?fields=id,title,image`)
    .then(response => response.json());
}

export function getRecipe(id) {
  return fetch(`${BASE_API_ENDPOINT}/recipes/${id}`)
    .then(response => response.json());
}
