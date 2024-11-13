import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
function protectedRoute({children}) {
    const token=useSelector((state)=>state.token.token)

  return (
    token?children:<Navigate to='/signin'/>
  )
}

export default protectedRoute
