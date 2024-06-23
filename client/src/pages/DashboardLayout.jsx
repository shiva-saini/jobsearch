import React, { createContext, useContext } from "react";
import { Outlet, redirect , useLoaderData , useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, SmallSideBar } from "../components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const loader = async () => {
  try{
    const data = await customFetch.get('/users/current-user');
  return data;

  }catch(err){
    return redirect('/')
  }
  

}
//note at some places i have written theme as theem
const DashboardContext = createContext();
// const checkDefaultTheme = () => {
//   const isDarkTheme = localStorage.getItem('dark-theme') == 'true';
//   document.body.classList.toggle('dark-theme',isDarkTheme);
//   return isDarkTheme;

// }
const DashboardLayout = ({}) => {
  const { user } = useLoaderData()?.data;
  // console.log(user);
  const navigate = useNavigate();
  // console.log(user)
  const [showSidebar,setShowSidebar] = useState(false);
  const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme',newDarkTheme);
    localStorage.setItem('dark-theme',newDarkTheme)
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    return toast.success('logged out successfully');
  }
  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet context = {{user}}/>
          </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
