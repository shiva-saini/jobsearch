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
            element:<AllJobs/>
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
            element:<Admin/>
          },
          {
            path:'navbar',
            element:<Navbar/>
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
