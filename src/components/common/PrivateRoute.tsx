import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}: any) {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to={'/login'}/>
}

export default PrivateRoute