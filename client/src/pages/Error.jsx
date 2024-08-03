import React from 'react'
import { Link , useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'
const Error = () => {
  const e = useRouteError()
  console.log(e)
  if(e.status == 404){
    return <Wrapper>
      <div>
      <img src={img} alt="" srcSet="" />
      <h3>Ohh! Page not found!</h3>
      <p>We can't seem to find page you are looking for.</p>
      <Link to='/dashboard'>Back to dashboard</Link>

      </div>
     
    </Wrapper>
  }
  return (
    <div>
      <h1>Error Page</h1>
     <Link to="/">Back Home</Link>
    </div>
  )
}

export default Error
