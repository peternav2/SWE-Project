import React, {useEffect, useState} from 'react'
import {User} from "./stores/User";
import {Outlet, Route, Routes, useNavigate, useOutletContext} from "react-router-dom";


function App() {
  const [user, setUserContext] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUserContext(JSON.parse(localStorage.getItem('user') as string));
    if (user?.isStudent) {
        navigate('/student/university/' + user?.universityId)
    } else {
        //navigate('/admin/university/' + user?.universityId)
    }
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
