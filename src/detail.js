import {
  buildConfirmedInfo,
  buildRecipeDetailHTML,
  buildBackgroundSyncOfferHTML,
} from './lib/templates';
import { mount } from './lib/dom';
import * as listen from './lib/events';
import SWManager from './lib/sw-manager';
import { getRecipe } from './lib/request';
import { getRecipeId } from './lib/utils';
import { queue, askNotificationPermission } from './lib/sync';

const recipeId = getRecipeId();
const mountIntoDOM = html => mount('#recipe-detail', html);

getRecipe(recipeId)
  .catch(offerBgSync)
  .then(buildRecipeDetailHTML)
  .then(mountIntoDOM);

function offerBgSync() {
  if (!window.navigator.onLine) {
    mount('#recipe-detail', buildBackgroundSyncOfferHTML());

    const queueLoadRecipe = () => queue('load-recipe-queue', { recipeId })
      .then(() => navigator.serviceWorker.ready)
      .then(reg => reg.sync.register('load-recipe'))
      .then(buildConfirmedInfo)
      .then(mountIntoDOM)
      .catch((err) => {
        console.log('Cannot register sync', err);
      });

    listen.approveLoadRecipe(() => {
      askNotificationPermission()
        .then(queueLoadRecipe);
    });
  }
}

new SWManager();
