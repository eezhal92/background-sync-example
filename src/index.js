import { mount } from './lib/dom';
import { getRecipes } from './lib/request';
import { SWManager } from './lib/service-worker';
import { buildRecipesListTemplate } from './lib/templates';

const takeResult = response => response.result;
const mountIntoDOM = html => mount('#recipes', html);

getRecipes()
  .then(takeResult)
  .then(buildRecipesListTemplate)
  .then(mountIntoDOM);

const sw = new SWManager();

sw.register();
