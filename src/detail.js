import { mount } from './lib/dom';
import * as listen from './lib/events';
import SWManager from './lib/sw-manager';
import { getRecipe } from './lib/request';
import { getRecipeId } from './lib/utils';
import { buildRecipeDetailHTML } from './lib/templates';
import { getInstance as getAlert } from './lib/update-alert';

const recipeId = getRecipeId();
const mountIntoDOM = html => mount('#recipe-detail', html);

getRecipe(recipeId)
  .then(buildRecipeDetailHTML)
  .then(mountIntoDOM)
  .then(listen.submitComment)
  .then(getAlert);

new SWManager();
