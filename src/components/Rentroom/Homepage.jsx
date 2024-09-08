import React from 'react'
import { StickyNavbar } from '../navbar/StickyNavbar'
import { BannerPages } from './BannerPages'
import MiddleSection from './MiddleSection'
import Footer from './Footer'

function Homepage() {
  return (
    <>
      <StickyNavbar/>

      <div className=' flex flex-col'>
       <BannerPages/>
       <MiddleSection/>
       <Footer/>

      </div>
     
    </>
  )
}

export default Homepage
