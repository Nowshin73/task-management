import React from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from '../pages/layout/Layout';
import Home from '../pages/home/Home';
import Dashboard from '../pages/dashboard/Dashboard';

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Layout></Layout>,
        children:[
    
            {
                path: '/',
                element: <Dashboard></Dashboard>,
               
            }
        ]
    },

]);