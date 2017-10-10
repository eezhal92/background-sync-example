export function SWManager() {
  this.registration = null;
  this.refreshing = false;
}

SWManager.prototype.register = function register() {
  return navigator.serviceWorker.register('./sw.js')
    .then((registration) => {
      this.registration = registration;

      log('Registered!');

      if (registration.waiting) {
        log('Waiting...');

        return;
      }

      if (registration.installing) {
        log('Installing...');

        return;
      }

      registration.addEventListener('updatefound', () => {
        log('Update Found!');
      });

      this.listenControllerChange();
    })
    .catch((err) => {
      log('Service Worker registration failed', err);
    });
};

SWManager.prototype.listenControllerChange = function listenControllerChange() {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (this.refreshing) return;

    window.location.reload();
    this.refreshing = true;
  });
};

function log(message, err) {
  if (!err) err = '';

  console.log(`[SWManager] ${message}`, err);
}
