import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function protectedRoute({children}) {
    const token=useSelector((state)=>state.token.token)

  return (
    token?children:<Navigate to='/admin'/>
  )
}

export default protectedRoute
