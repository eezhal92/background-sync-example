import { mount } from './lib/dom';
import * as listen from './lib/events';
import { getRecipe } from './lib/request';
import { getRecipeId } from './lib/utils';
import { SWManager } from './lib/service-worker';
import { buildRecipeDetailHTML } from './lib/templates';

const recipeId = getRecipeId();
const mountIntoDOM = html => mount('#recipe-detail', html);

getRecipe(recipeId)
  .then(buildRecipeDetailHTML)
  .then(mountIntoDOM)
  .then(listen.submitComment);

const sw = new SWManager();

sw.register();
