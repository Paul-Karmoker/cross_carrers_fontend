/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../Components/navbar' 
import Banner from '../Components/banner' 
import Slider from '../Components/slider' 
import Footer from '../Components/footer'
import Marqueer from '../Components/marqueer'
import Marqueel from '../Components/marqueel'

function home() {
  return (
    <>
    <Navbar/>
    <Marqueer/>
    <Banner/>
    <Slider/>
    <Marqueel/>
    <Footer/>
    </>
  )
}

export default home