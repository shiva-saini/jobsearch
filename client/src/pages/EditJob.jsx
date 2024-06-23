import React from 'react'
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try{
    console.log(params)
    const data = await customFetch.get(`https://api.example.com/jobs/${params.id}`)
    console.log(data)
    return data;
  }catch(error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/alljobs')
  }
 
}

export const action = async () => {
  return null;
}
const EditJob = () => {
  const {job} = useLoaderData();
  console.log(job)
  return (
    <div>
      <h1>sadfasf</h1>
    </div>
  )
}

export default EditJob
