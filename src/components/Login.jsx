import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mockup authentication
    if (username === 'admin' && password === 'password123') {
      onLogin();
      setError('');
    } else {
      setError('Invalid username or password. Try admin/password123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🌸 My Flower Cards</h1>
          <p>Please login to view the flower gallery</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Login
          </button>
          
          <div className="login-hint">
            <small>Hint: username: <strong>admin</strong> | password: <strong>password123</strong></small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
