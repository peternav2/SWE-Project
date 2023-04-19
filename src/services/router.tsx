
import React from 'react'
import {createBrowserRouter, useParams} from 'react-router-dom'
import App from '../App'
import '../index.css'
import RenderUser from '../routes/RenderUser'
import CreateAccount, {loader as createAccountLoader} from '../components/CreateAccount'
import StudentDiningHallHome, {loader as diningHomeLoader} from "../routes/student/studentDiningHallHome";
import StudentMenuForDay, {loader as menuForDayLoader} from "../routes/student/studentMenuForDay";
import Login from "../routes/Login";
import StudentUniversityHome, {loader as StudentUniversityHomeLoader} from "../routes/student/studentUniversityHome";
import StudentEventForDay from "../routes/student/studentEventForDay";
import AdminHome, {loader as universityLoader } from '../routes/admin/adminRoot'
import AddDining, {loader as diningLoader, action as diningAction} from '../routes/admin/addDining'
import CreateMenu, {loader as createMenuLoader} from '../routes/admin/createMenu'
import { action as menuItemFormAction } from '../routes/admin/menuItemForm'
import { wrapUserBar } from '../components/Auth'
import { AboutUs } from '../components/AboutUs'

import MenuItemForm from '../routes/admin/menuItemForm'

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
                path: "/renderuser/",
                element: <RenderUser />,
            },
            {
                path: '/student/university/:universityId/',
                element: wrapUserBar(<StudentUniversityHome />),
                loader: StudentUniversityHomeLoader,
            },
            {
                path: '/student/dininghall/:diningHallId/:diningHallName',
                element: wrapUserBar(<StudentDiningHallHome />),
                loader: diningHomeLoader,
            },
            {
                path: '/student/day/menu/:diningHallId/:month/:day/:year',
                element: wrapUserBar(<StudentMenuForDay />),
                loader: menuForDayLoader,
            },
            {
                path: '/student/day/event/:diningHallId/:month/:day/:year',
                element: wrapUserBar(<StudentEventForDay />),
                //insert loader here for event datad
            },
            {
                path: "createaccount",
                element: <CreateAccount />,
                loader: createAccountLoader
            },
            {
                path: "/admin/university/:universityId/",
                element: wrapUserBar(<AdminHome />),
                loader: universityLoader,
                children: 
                [{
                    path: 'addDining',
                    element: <AddDining />,
                    loader: diningLoader,
                    action: diningAction,
                }]
            },
            {
                path: "/admin/university/:universityId/dininghall/:diningHallId/",
                element: wrapUserBar(<StudentDiningHallHome />),
                loader: diningHomeLoader,
            },
            {
                path: "/admin/university/:universityId/dininghall/:diningHallId/createmenu/:month/:day/:year/",
                element: <CreateMenu />,
                loader: createMenuLoader,
                children: 
                [{
                    path: 'new/:mealType',
                    element: <MenuItemForm />,
                }]
            },
            {
                path: "aboutus",
                element: wrapUserBar(<AboutUs />),
            }
       ]
    },
])//