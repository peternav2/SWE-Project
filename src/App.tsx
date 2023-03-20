import { useState } from 'react'
import RouterNav from './components/routerNav';
import TestPost from './components/testPost'
import {User} from "./stores/User";
import {Outlet, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import RenderUser from "./Pages/RenderUser";
import useUserState from "./hooks/useUserState";
function App() {

    return (
    <div>
      <Login />
      {/*  <Routes>*/}
      {/*    <Route path='/' element={<Login  />} />*/}
      {/*    <Route path='/render-user' element={<RenderUser />} />*/}
      {/*  </Routes>*/}
    </div>
  )
}

export default App
