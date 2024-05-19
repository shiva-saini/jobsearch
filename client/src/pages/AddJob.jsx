import React from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import FormRowSelect from '../components/FormRowSelect'


export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  console.log('data is ', data)
  try{
    await customFetch.post('/jobs',data)
    toast.success('job created successfully')
    return redirect('alljobs')
  }catch(err){
    return toast.error(err);
  }
}
const AddJob = () => {
  const { user } = useOutletContext();
  console.log(user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" labelText="position" name="position"></FormRow>
          <FormRow type="text" labelText="company" name="company"></FormRow>
          <FormRow
            type="text"
            labelText="jobLocation"
            name="jobLocation"
            defaultValue={user.location}
          ></FormRow>
          <FormRowSelect name='jobStatus' labelText='job Status' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name='jobType' labelText='job Type' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
