// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';


const App: React.FC = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to my React app!</p>
    </div>
  );
};

export default App;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);