import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/Sign in/SignIn'
import SignUp from './components/Sign up/signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/home/home'
function App() {


  return (
   <BrowserRouter>
   <Routes>

    <Route path='/' element={<SignIn/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/signin' element={<SignIn/>}></Route>

   </Routes>

   </BrowserRouter>
  )
}

export default App
