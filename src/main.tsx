import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import App from './App'
import './index.css'
import { router } from './services/router'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Routing note: In order to add a router to the app you need to create <Route/>
  // element here that links to a given component, then, in other components you can
  // use <Link/> with the a "to" prop that matches the "path" prop on <Route/> to hit
  // that component.
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
