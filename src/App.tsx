import React, {useEffect, useState} from 'react'
import {User} from "./stores/User";

import {Outlet, Route, Routes, useNavigate, useOutletContext} from "react-router-dom";


function App() {
  const [user, setUserContext] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUserContext(JSON.parse(localStorage.getItem('user') as string));

  }, []);
    return (
      <Outlet context={[user, setUserContext]}/>
  )
}

type ContextType = [user: User, setUser: (user: User) => void];


export function useUser() {
  return useOutletContext<ContextType>();
}

export default App
