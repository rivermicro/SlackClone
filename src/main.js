import React from './mini-react.js';
import ReactDOM from './mini-react-dom.js';
import App from './App.js';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(React.createElement(App, null));
