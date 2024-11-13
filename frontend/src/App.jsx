import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/Sign in/SignIn'
import SignUp from './components/Sign up/signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/home/home'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import Profile from './components/profilePage/profile'
import AdminLogin from './components/admin/adminLogin'
import AdminHome from './components/admin/adminHome'
function App() {


  return (
   <BrowserRouter>
   <Routes>

    <Route path='/' element={<SignIn/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>

    <Route path='/home' element={ <ProtectedRoute> <Home/> </ProtectedRoute>}></Route>
   
    <Route path='/signin' element={<SignIn/>}></Route>
    <Route path='/proflie' element={<ProtectedRoute> <Profile/> </ProtectedRoute> }></Route>
    <Route path='/admin' element={<AdminLogin/>}></Route>
    <Route path='/admin/dashboard' element={ <AdminHome/>}></Route>

   </Routes>

   </BrowserRouter>
  )
}

export default App
