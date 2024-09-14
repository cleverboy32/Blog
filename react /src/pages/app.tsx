import React from 'react';
import ReactDOM from 'react-dom';

import { RouterProvider } from 'react-router-dom';
import "assets/style/reset.css";

import router from './route';

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);