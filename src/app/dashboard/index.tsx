import React from 'react'
import Dashboard from './dashboard';
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';
function index() {
  return (
      <>
          <Navbar />
          <Dashboard />
          <Footer/>
      </>
  )
}

export default index