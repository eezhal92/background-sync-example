export function mount(selector, html) {
  const mountEl = document.querySelector(selector);

  mountEl.innerHTML = html;
}
