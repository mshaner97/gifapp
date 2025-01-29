import Button from '@mui/material/Button';
import './App.css'
import React, { useContext } from 'react';
import SearchPage from './searchPage'
import LoginForm from './loginPage'
import { UserProvider, UserContext } from './userContext'
import {QueryClient, QueryClientProvider, useQuery,} from "@tanstack/react-query";

  const queryClient= new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    );
  }
  
  export default AppWrapper;