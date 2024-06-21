import React from 'react'
import Header from './Header'
import Patient_info from './Patient_info'
import Vitals from './Vitals'
import Disease_summary from './Disease_summary'
import Navbar from '../Home/Navbar';

const Disease = () => {
  return (<>
    <div className='flex flex-col bg-blue-200'><div><Navbar/></div>
    <div><Header/></div>
    <div><Vitals/></div>
    <div><Disease_summary/></div>
    </div>
    </>)
}

export default Disease