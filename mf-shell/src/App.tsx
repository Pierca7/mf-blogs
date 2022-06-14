import React from 'react';
import logo from './logo.svg';

import './App.css';

// @ts-ignore
const App1 = React.lazy(() => import('app_1/App'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Shell
        </h1>
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <App1 />
          </React.Suspense>
        </div>
      </header>
    </div>
  );
}

export default App;
