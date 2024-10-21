import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";
import Home from "./Home"; 
import LogIn from "./LogIn"; 
import App from "./App"; 
import Tips from "./Tips";
import Goal from "./Goal";
import Profile from "./Profile";
import Impact from "./Impact";
import LogUsage from "./LogUsage";
import LeaderBoards from "./LeaderBoards";
import './Styles/App.scss';
import './index.scss';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';

const RouterComponent: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');


  interface User {
    email: string;
    token: string;
  }
  
  useEffect(() => {

    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
  

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }
  

    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn(r.message === 'success');
        setEmail(user.email || '');
      });
  }, []);
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home email="" loggedIn={false} setLoggedIn={() => {}} />} />
      <Route path="/LogIn" element={<LogIn setLoggedIn={() => { } } setEmail={function (value: React.SetStateAction<string>): void {
                  throw new Error('Function not implemented.');
              } } />} />
      <Route path="/SignUp" element={<SignUp setLoggedIn={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } setEmail={function (value: React.SetStateAction<string>): void {
          throw new Error('Function not implemented.');
        } } />} />
      <Route path="/App" element={<App />} />
      <Route path="/LogUsage" element={<LogUsage />} />
      <Route path="/Tips" element={<Tips />} />
      <Route path="/Impact" element={<Impact />} />
      <Route path="/Goal" element={<Goal />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/LeaderBoards" element={<LeaderBoards/>} />
    </Routes>
    </div>
  );
};

export default RouterComponent;