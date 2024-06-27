import React from 'react'
import PatientPage from './Records'
import Navbar from '../Home/Navbar';
import  Footer from '../Footer';


const PRecords = () => {
  return (
    <div className='flex font-roboto flex-col gap-1 bg-gray-50'>
        <Navbar/>
        <PatientPage/>
        <Footer/>
    </div>
  )
}

export default PRecords