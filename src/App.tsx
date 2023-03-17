import { useState } from 'react'
import RouterNav from './components/routerNav';
import TestPost from './components/testPost'
import {User} from "./stores/User";
import {Outlet, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import RenderUser from "./Pages/RenderUser";
function App() {
    const [user, setUser] = useState<User | null>(null);

  return (
    <div>
        <Routes>
          <Route path='/' element={<Login user={user} setUser={setUser} />} />
          <Route path='/render-user' element={<RenderUser user={user} />} />
        </Routes>
    </div>
  )
}

export default App
