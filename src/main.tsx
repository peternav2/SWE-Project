import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,
           Routes,
           Route,
} from 'react-router-dom'
import App from './App'
import './index.css'
import Docs from "../src/routes/docs";
import Login from "../src/routes/login";
import UniversityMenus from "../src/routes/universityMenus";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="docs" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="view-menus" element={<UniversityMenus />} />
    </Routes>
  </BrowserRouter>,
)