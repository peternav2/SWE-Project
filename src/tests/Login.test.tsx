import {describe, expect, test} from 'vitest';
import {render, waitFor, screen} from '@testing-library/react';
import "@testing-library/jest-dom";
import Login from '../routes/Login';
import {BrowserRouter, MemoryRouter,RouterProvider,createMemoryRouter} from 'react-router-dom'
import CreateAccount, {loader as createAccountLoader} from '../components/CreateAccount'
import {router} from '../services/router';
import App from '../App';
import Loading from '../components/Loading';
import * as React from "react";

describe("Login test", () => {
    test("Should show signup text", () => {
        render(<Login/>,{wrapper: BrowserRouter});

        // verify page content for default route
        expect(screen.getByText(/Sign into your account/i)).toBeDefined()
            
    })
})

describe("Loading", () => {
    test("Should show loading text", () => {
        render(<Loading/>,{wrapper: BrowserRouter});

        // verify page content for default route
        expect(screen.getByText(/Loading/i)).toBeDefined()
            
    })
})

describe("Create account test", () => {
    test("Should show confirm password text", async () => {
        const routes = [
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        path: "",
                        element: <Login />,

                    },
                    {
                        path: "/createaccount",
                        element: <CreateAccount />,
                        loader: createAccountLoader,
                    }
                ]
            }
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: ["/","/createaccount"],
            // this index starts at 1 not zero... took me way too long to figure that out
            initialIndex: 2,
          });
        
          render(<RouterProvider router={router} />);

          await waitFor(() => 
          expect(screen.getAllByText(/Create your account/i)).toBeDefined()
        )
    })
})