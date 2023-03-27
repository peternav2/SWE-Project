import React, {useEffect, useState} from 'react'
import {User} from "./stores/User";
import {Outlet, Route, Routes, useOutletContext} from "react-router-dom";


function App() {
  const [user, setUserContext] = useState<User | null>(null);
  useEffect(() => {
    setUserContext(JSON.parse(localStorage.getItem('user') as string));
  }, []);
  // const user = localStorage.getItem('user');
  // const setUser = (user: User) => {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   setUserContext(user);
  // }
    return (
    <div>
      <Outlet context={[user, setUserContext]}/>
    {/*
         the above Outlet is where our app is gonna render and it is through this element which our app will render
         and have access to the user store through Context
     */}
    </div>
  )
}

type ContextType = [user: User, setUser: (user: User) => void];

export function useUser() {
  return useOutletContext<ContextType>();
}

export default App
