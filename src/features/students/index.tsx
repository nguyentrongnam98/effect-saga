import React from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchCityList } from '../city/citySlice';
import ListPage from './pages/ListPage';

interface Students {}
function Students(props:Students) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCityList())
  },[])
  return (
    <div>
      <ListPage/>
      <Outlet/>
    </div>
  )
}

export default Students;