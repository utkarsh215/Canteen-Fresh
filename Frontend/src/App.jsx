import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex-grow'>
        <Header/>
        <Outlet />
      </div>
      
      <Footer />
    </div>
  )
}


