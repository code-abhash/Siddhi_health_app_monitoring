import React from 'react'
import Records from './Records'
import Navbar from '../Home/Navbar';
import  Footer from '../Footer';


const PRecords = () => {
  return (
    <div className='flex font-roboto flex-col gap-1 bg-gray-50'>
        <Navbar/>
        <Records/>
        <Footer/>
    </div>
  )
}

export default PRecords