import React from 'react'
import Paper from '@mui/material/Paper';
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../authSlice';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn)
  const logging = useSelector((state:any) => state.auth.logging)
  const handleLogin = () => {
    dispatch(login({
      username:'admin',
      password:'admin',
      onSuccess:() => naviagate('/admin')
    }))
  } 
  const handleLogout = () => {
    dispatch(logout())
  } 
  return (
    <div className='root'>
      <h1>Student management</h1>
      <div className='login'>
        <button onClick={handleLogin}>Fake login</button>
        <button onClick={handleLogout}>Fake logout</button>
      </div>
    </div>
  )
}

export default LoginPage