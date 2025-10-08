import { useState } from 'react';
import Login from './components/Login';
import FlowerCards from './components/FlowerCards';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <FlowerCards onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;