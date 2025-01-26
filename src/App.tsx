import { useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
          type="text"
          id="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <button type="submit">Log In</button>
      </form>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <LoginForm />
      </div>
    </>
  );
}

export default App