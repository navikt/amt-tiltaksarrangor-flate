import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { App } from './App';
import env from './utils/environment';

if (env.isDevelopment) {
    require('./mock');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
