import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";

import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob';
import {loader as dashboardLoader} from './pages/DashboardLayout'
import {loader as allJobsLoader} from './pages/AllJobs';
import {loader as editJobLoader} from './pages/EditJob';
import {action as editJobAction} from './pages/EditJob';
import {loader as adminLoader} from './pages/Admin';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') == 'true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;

}

checkDefaultTheme();

import { Navbar } from "./components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element: <Landing/>
      },
      {
        path:'landing',
        element: <Landing/>
      }
      ,
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      }
      ,
      {
        path: "about",
        element: <h1>Hello this is about page</h1>,
      }
      ,
    
      {
        path: "admin",
        element: <Admin/>,
      },
      {
        path: "register",
        element: <Register/>,
        action:registerAction,
      }
      ,
      {
        path: "dashboard",
        element: <DashboardLayout/>,
        loader:dashboardLoader,
        children:[

          {
            index:true,
            element:<AddJob/>,
            action:addJobAction,
          }
          ,
          {
            path:'alljobs',
            element:<AllJobs/>,
            loader:allJobsLoader,
          },
          {
            path:'stats',
            element:<Stats/>
          },
          {
            path:'profile',
            element:<Profile/>
          },
          {
            path:'admin',
            element:<Admin/>,
            loader:adminLoader,
          },
          {
            path:'navbar',
            element:<Navbar/>
          } 
          ,
          {
            path:'edit-job/:id',
            element:<EditJob/>,
            action:editJobAction,
            loader:editJobLoader,
          }
        ]
      }

    ]
  }
  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
