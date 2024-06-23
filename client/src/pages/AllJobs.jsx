import React from 'react'
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from 'react';
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import axios from 'axios';

export const loader = async () => {
  try{
    //  const {data} = await customFetch.get('/jobs');
    const data = await fetch("http://localhost:5100/api/v1/jobs");
     console.log(" this is data", await data.json());
     debugger
     return data;
  }catch(error) {
    return toast.error(error.response.data.msg)
  }
}


const AllJobsContext = createContext();

const AllJobs = () => {
  const {data} = useLoaderData();
  return (
    <AllJobsContext.Provider value={data}>
     <SearchContainer/>
     {/* <JobsContainer/> */}
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
