import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'
import Logo from '../components/Logo'
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try{
    await customFetch.post('/auth/register',data);
    toast.success('Registration successful')
    return redirect('/login')
    // return null;
  }catch(err){
    toast.error(err?.response?.data?.msg)
    return err;
  }
 
}
const Register = () => {
  const navigation = useNavigation()
  console.log(navigation)
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register Page</h4>
        <FormRow type='text' name='name' defaultValue="shiva"/>
        <FormRow type='text' name='lastName' labelText="Last Name" defaultValue="saini"/>
        <FormRow type='text' name='location' labelText="location" defaultValue="earth"/>
        <FormRow type='email' name='email' labelText="email" defaultValue="shvi@gmail.com"/>
        <FormRow type='password' name='password' labelText="password" defaultValue="shvia@123"/>
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'submit'}
        </button>
        <p>
          Already a member ?
          <Link to="/login" className='member-btn'>Login</Link>
        </p>

      </Form>
      
      
    </Wrapper>
  )
}

export default Register
