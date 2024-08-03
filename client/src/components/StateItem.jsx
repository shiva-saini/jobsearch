import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'
const StateItem = ({count,title,icon,color,bcg}) => {
  return (
    <div>
      <header>
        <span className='count'> {count} </span>
        <span className='icon'> {icon} </span>
      </header>
      <h5 className='title'>{title}</h5>
    </div>
  )
}

export default StateItem
