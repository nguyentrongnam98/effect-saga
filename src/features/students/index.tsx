import React from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchCityList } from '../city/citySlice';
import ListPage from './pages/ListPage';
import { useParams } from 'react-router-dom';
interface Students {}
function Students(props:Students) {
  const dispatch = useDispatch();
  const params = useParams()
  React.useEffect(() => {
    dispatch(fetchCityList())
  },[])
  return (
    <div>
      {params['*'] == '' ? <ListPage/> : <Outlet/>}
    </div>
  )
}

export default Students;