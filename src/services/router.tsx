import React from 'react'
import { BrowserRouter,
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import App from '../App'
import '../index.css'
import RenderUser from '../Pages/RenderUser'
import LoginRoute from "../routes/loginRoute";
import UniversityMenus from "../routes/universityMenus";
import EventBoard from '../routes/eventBoard'
import OffCampusDining from '../routes/offCampusDinning'
import UniversityMenuReviews from '../routes/universityMenuReviews'
import SubmitUniversityDishReview from '../routes/submitUniversityDishReview'
import CreateAccountRoute from '../routes/createAccountRoute'
import StudentHub from '../routes/studentHub'
import AdminHub from '../routes/adminHub'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/render-user",
                // element: <RenderUser user={null} />,
            },
        ],
    },
    {
        path: '/docs',
        element: <App />,
    },
    {
        path: '/login',
        element: <LoginRoute />,
    },    {
        path: '/create-account',
        element: <CreateAccountRoute />,
    },    {
        path: '/off-campus-dining',
        element: <OffCampusDining/>,
    },    {
        path: '/university-menu-reviews',
        element: <UniversityMenuReviews/>,
    },    {
        path: '/event-board',
        element: <EventBoard />,
    },    {
        path: '/view-menus',
        element: <UniversityMenus />,
    },    {
        path: '/dish-review-form',
        element: <SubmitUniversityDishReview />,
    },    {
        path: '/student-hub',
        element: <StudentHub />,
    }, {
        path: 'admin-hub',
        element: <AdminHub/>,
    }
])