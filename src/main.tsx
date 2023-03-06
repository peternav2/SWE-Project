import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,
           Routes,
           Route,
} from 'react-router-dom'
import App from './App'
import './index.css'
import Docs from "../src/routes/docs";
import LoginRoute from "./routes/loginRoute";
import UniversityMenus from "../src/routes/universityMenus";
import EventBoard from './routes/eventBoard'
import OffCampusDining from './routes/offCampusDinning'
import UniversityMenuReviews from './routes/universityMenuReviews'
import SubmitUniversityDishReview from './routes/submitUniversityDishReview'
import CreateAccountRoute from './routes/createAccountRoute'
import RouterNav from './components/routerNav'
import StudentHub from './routes/studentHub'
import AdminHub from './routes/adminHub'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Routing note: In order to add a router to the app you need to create <Route/>
  // element here that links to a given component, then, in other components you can
  // use <Link/> with the a "to" prop that matches the "path" prop on <Route/> to hit
  // that component.
  <>
    <BrowserRouter>
      <RouterNav/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="docs" element={<App />} />
          <Route path="login" element={<LoginRoute />} />
          <Route path="create-account" element={<CreateAccountRoute />} />
          <Route path="off-campus-dining" element={<OffCampusDining />} />
          <Route path="university-menu-reviews" element={<UniversityMenuReviews />} />
          <Route path="event-board" element={<EventBoard />} />
          <Route path="view-menus" element={<UniversityMenus />} />
          <Route path="dish-review-form" element={<SubmitUniversityDishReview />} />
          <Route path="student-hub" element={<StudentHub />} />
          <Route path="admin-hub" element={<AdminHub />} />
        </Routes>
      </BrowserRouter>
    </>,
)
