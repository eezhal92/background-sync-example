import { cacheName } from '../sw.js';

export const BASE_API_ENDPOINT = `https://resepku-api.herokuapp.com`;

export function getRecipes() {
  return fetch(`${BASE_API_ENDPOINT}/recipes?fields=id,title,image`)
    .then(response => response.json());
}

export function getRecipe(id) {
  return fetch(`${BASE_API_ENDPOINT}/recipes/${id}`)
    .then(response => response.json());
}

export async function getRecipeAndCache(id) {
  const request = new Request(`${BASE_API_ENDPOINT}/recipes/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
  const response = await fetch(request);
  const cache = await caches.open(cacheName);

  await cache.put(request, response.clone());

  return response.json();
}
