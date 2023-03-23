import React from 'react'
import {createBrowserRouter, useParams} from 'react-router-dom'
import App from '../App'

import '../index.css'
import RenderUser from '../routes/RenderUser'
import DiningHallHome, {
    loader as diningHallHomeLoader,
} from "../routes/diningHallHome";
import MenuForDay, {loader as menuForDayLoader} from "../routes/menuForDay";
import Login from "../routes/Login";

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
                path: "renderuser/",
                element: <RenderUser />,
            },
            {
                path: '/dininghall/:universityId/:diningHallId/:diningHallName',
                element: <DiningHallHome />,
                loader: diningHallHomeLoader,
            },
            {
                path: '/day/:diningHallId/:month/:day/:year',
                element: <MenuForDay />,
                loader: menuForDayLoader,
            },
        ],
    },
])