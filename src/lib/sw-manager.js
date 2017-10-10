import { getInstance } from './update-alert';

export default class SWManager {
  constructor() {
    this.swRegistration = null;
    this.swContainer = navigator.serviceWorker;

    // only call once in constructor
    // hide registerServiceWorker api from class
    registerServiceWorker.call(this);
  }

  showUpdateAlert() {
    const alert = getInstance();

    alert.show();

    alert.button.addEventListener('click', (event) => {
      event.preventDefault();

      this.swRegistration.waiting.postMessage({ action: 'skipWaiting' })

      alert.hide();
    });
  }
}

function registerServiceWorker() {
  return navigator.serviceWorker.register('./sw.js')
    .then((registration) => {
      log('Registered!');

      this.swRegistration = registration;

      if (registration.waiting) {
        log('New service worker are waiting...');

        this.showUpdateAlert();
      } else if (registration.installing) {
        log('Installing service worker for the first time...');
      } else if (registration.active) {
        log('There is an active service worker running...');
      }

      this.swRegistration.addEventListener('updatefound', (event) => {
        const updateFound = event.target.active;

        if (!updateFound) {
          return;
        }

        log('Update Found!');
        this.showUpdateAlert();
      });

      this.swContainer.addEventListener('controllerchange', () => {
        log('Controller Changed!!');
      });
    })
    .catch((err) => {
      log('Service Worker registration failed', err);
    });
}

function log(message, err) {
  if (!err) err = '';

  console.log(`[SWManager] ${message}`, err);
}
