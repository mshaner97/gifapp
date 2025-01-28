import Button from '@mui/material/Button';
import './App.css'
import React, { useContext } from 'react';
import SearchPage from './searchPage'
import LoginForm from './loginPage'
import { UserProvider, UserContext } from './userContext'

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? <SearchPage /> : <LoginForm />}
    </div>
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWrapper;