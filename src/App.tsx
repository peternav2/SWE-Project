import React, { useState } from 'react'
import RouterNav from './components/routerNav';
import TestPost from './components/testPost'
import {User} from "./stores/User";
import {Outlet, Route, Routes, useOutletContext} from "react-router-dom";
import Login from "./components/Login";
import RenderUser from "./Pages/RenderUser";
import useUserState from "./hooks/useUserState";

type ContextType = [user: User, setUser: (user: User) => void];
function App() {
  const [userContext, setUserContext] = useState<User | null>(null);
  const [userState, setUserState] = useUserState();
    return (
    <div>
      <RouterNav />
      <Outlet context={[userContext, setUserContext]}/>
    </div>
  )
}
export function useUser() {
  return useOutletContext<ContextType>();
}

export default App
