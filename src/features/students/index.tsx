import React from 'react'
import { Outlet } from 'react-router-dom';
import ListPage from './pages/ListPage';

interface Students {}
function Students(props:Students) {
  return (
    <div>
      <ListPage/>
      <Outlet/>
    </div>
  )
}

export default Students;