export function mount(selector, html) {
  const mountEl = document.querySelector(selector);

  mountEl.innerHTML = html;
}

export function append(selector, html) {
  const appendedEl = document.querySelector(selector);

  appendedEl.append(html);
}

export function find(containerSelector, selector) {
  const container = document.querySelector(containerSelector);

  return container.querySelector(selector);
}
