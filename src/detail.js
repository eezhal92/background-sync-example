import { mount } from './lib/dom';
import * as listen from './lib/events';
import SWManager from './lib/sw-manager';
import { getRecipe } from './lib/request';
import { getRecipeId } from './lib/utils';
import { buildRecipeDetailHTML, buildBackgroundSyncOfferHTML } from './lib/templates';

const recipeId = getRecipeId();
const mountIntoDOM = html => mount('#recipe-detail', html);

getRecipe(recipeId)
  .then(buildRecipeDetailHTML)
  .then(mountIntoDOM)
  .then(listen.submitComment)
  .catch(offerBgSync);

function offerBgSync() {
  if (!window.navigator.onLine) {
    mount('#recipe-detail', buildBackgroundSyncOfferHTML());
  }
}

new SWManager();
