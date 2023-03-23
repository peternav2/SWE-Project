import React, { useState } from 'react'
import RouterNav from './components/routerNav';
import {User} from "./stores/User";
import {Outlet, Route, Routes, useOutletContext} from "react-router-dom";

type ContextType = [user: User, setUser: (user: User) => void];
function App() {
  const [userContext, setUserContext] = useState<User | null>(null);
    return (
    <div>
      <Outlet context={[userContext, setUserContext]}/>
    {/*
         the above Outlet is where our app is gonna render and it is through this element which our app will render
         and have access to the user store through Context
     */}
    </div>
  )
}
export function useUser() {
  return useOutletContext<ContextType>();
}

export default App
