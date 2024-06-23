import React from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
const JobsContainer = () => {
    const data = useAllJobsContext();
    debugger
    const { jobs } = data;
    if(jobs === null) return
    if(jobs.length === 0){
        return <Wrapper>
            <h2>No Job to display</h2>
        </Wrapper>
    }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
            return <Job key={job._id} {...job}/>
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
