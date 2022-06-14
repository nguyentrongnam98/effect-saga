import React from 'react'
import Paper from '@mui/material/Paper';
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
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
  return (
    <div className='root'>
      <h1>Student management</h1>
      <div className='login'>
        <button onClick={handleLogin}>{logging && <CircularProgress size={20} color="secondary"/>}Fake login</button>
      </div>
    </div>
  )
}

export default LoginPage