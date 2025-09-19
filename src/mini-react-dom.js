import React from './mini-react.js';

function createRoot(container) {
  if (!container) {
    throw new Error('Target container is not a DOM element.');
  }
  return {
    render(element) {
      React.__renderRoot(element, container);
    },
  };
}

const ReactDOM = { createRoot };
export default ReactDOM;
export { createRoot };
