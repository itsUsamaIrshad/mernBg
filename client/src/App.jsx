import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <>
    
    <div className=' min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right'/>

<Navbar/>

    <Routes>

<Route path='/' element={<Home/>}/>
<Route path='/buy' element={<BuyCredit/>}/>
<Route path='/Result' element={<Result/>}/>

    </Routes>
<Footer/>
    </div>
    
    </>
  )
}

export default App