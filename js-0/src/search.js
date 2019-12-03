const search = {
  value: '',
  listeners: { onsubmit: [], onchange: [] },
  addListener(key, fn) {
    this.listeners[key].push(fn);
  },
  invoke(key) {
    for (const listener of this.listeners[key]) {
      listener(this.value);
    }
  },
};

export function handleSubmit(e) {
  e.preventDefault();
  search.invoke('onsubmit');
}

export function handleChange(e) {
  search.value = e.target.value;
  search.invoke('onchange');
}

export function addListener(key, fn) {
  search.addListener(key, fn);
}
