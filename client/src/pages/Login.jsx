import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { FormRow } from '../components'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try{
    await customFetch.post('/auth/login',data)
    toast.success('loggedin successfully')
    return redirect('/dashboard')
  }catch(err){
    toast.error(err?.response?.data?.msg)
    return err;
  }
 
}
const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Login Page</h4> 
        <FormRow type='email' name='email' labelText="email" defaultValue="shiva@gmail.com"/>
        <FormRow type='password' name='password' labelText="password" defaultValue="shiva@123"/>
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'submit'}
        </button>
        <button type="button" className='btn btn-block'>Explore The App</button>
        <p>
          Not a member yet ?
          <Link to="/register" className='member-btn'>Register</Link>
        </p>

      </Form>
      
      
    </Wrapper>
  )
}

export default Login
