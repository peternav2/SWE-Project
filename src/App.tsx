import { useState } from 'react'
import RouterNav from './components/routerNav';
import TestPost from './components/testPost'
import {User} from "./stores/User";
import {Outlet, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import RenderUser from "./Pages/RenderUser";
import useUserState from "./hooks/useUserState";
function App() {
    const [user, setUser] = useState<User | null>(null);
    const [userState, setUserState] = useUserState();

    const handleLogin = (newUserState: User) => {
      setUserState(newUserState);
      localStorage.setItem('user', JSON.stringify(newUserState));
    };

    const handleLogout = () => {
      // @ts-ignore
      setUserState(null);
      localStorage.removeItem('user');
    };


    return (
    <div>
        <Routes>
          <Route path='/' element={<Login user={user} handleLogin={handleLogin} />} />
          <Route path='/render-user' element={<RenderUser />} />
        </Routes>
    </div>
  )
}

export default App
