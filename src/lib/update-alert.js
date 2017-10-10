import { find, append } from './dom';

function createContainer() {
  const container = document.createElement('div');

  container.id = 'sw-update-alert';
  container.classList.add('update-alert');
  container.classList.add('update-alert--hide');

  return container;
}

const alertContentTemplate = `
  <span>There is an update for this app.</span>
  <button id="sw-update-button">Update</button>
`;

function createAlert() {
  const container = createContainer();
  container.innerHTML = alertContentTemplate;

  return container;
}

class UpdateAlert {
  constructor() {
    this.el = null;
    this.button = null;

    this.mount();
  }

  mount() {
    append('body', createAlert())

    this.el = find('body', '#sw-update-alert');
    this.button = find('body', '#sw-update-button');
  }

  hide() {
    this.el.classList.add('update-alert--hide');
  }

  show() {
    this.el.classList.remove('update-alert--hide');
  }
}

export function getInstance() {
  let instance = null;

  if (!instance) {
    instance = new UpdateAlert();
    window.alert = instance;
  }

  return instance;
}
