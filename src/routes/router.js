import React from "react";
import { createBrowserRouter, } from "react-router-dom";
import Home from "../components/Home";
import RootLayout from "../utils/root_layout";
import ErrorPage from "../components/_Common/error_page";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />
            },
        ],
    },
]);