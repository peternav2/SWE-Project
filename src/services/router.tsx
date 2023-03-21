import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import App from '../App'

import '../index.css'
import RenderUser from '../pages/RenderUser'
import DiningHallHome, {
    loader as diningHallHomeLoader,
} from "../routes/diningHallHome";
import Login from "../components/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Login />,
            },
            {
                path: "renderUser/",
                element: <RenderUser />,
            },
        ],
    },
    {
        path: '/dininghall/:universityId/:diningHallId',
        element: <DiningHallHome />,
        loader: diningHallHomeLoader,
    },
//         path: '/create-account',
//         element: <CreateAccountRoute />,
//     },    {
//         path: '/off-campus-dining',
//         element: <OffCampusDining/>,
//     },    {
//         path: '/university-menu-reviews',
//         element: <UniversityMenuReviews/>,
//     },    {
//         path: '/event-board',
//         element: <EventBoard />,
//     },    {
//         path: '/view-menus',
//         element: <UniversityMenus />,
//     },    {
//         path: '/dish-review-form',
//         element: <SubmitUniversityDishReview />,
//     },    {
//         path: '/student-hub',
//         element: <StudentHub />,
//     }, {
//         path: 'admin-hub',
//         element: <AdminHub/>,
//     }
])