
import React from 'react'
import Dashboard from '../../features/dashboard'
import Students from '../../features/students'
export interface MainProps {}
function Main(props:MainProps) {
  return (
    <div>
      <Students/>
      <Dashboard/>
    </div>
  )
}

export default Main