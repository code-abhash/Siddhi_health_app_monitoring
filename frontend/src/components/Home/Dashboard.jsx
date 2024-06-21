import React from 'react'
import New from './Icon/New.png'
import Active from './Icon/Active.png'
import Totalpatients from './Icon/Totalpatients.png'
import Visitors from './Icon/Visitors.png'
import './Home.css'

const Dashboard = () => {
  return (
    <div className='font-roboto flex flex-col items-center gap-4 sm:flex-row md:gap-4 lg:gap-5 xl:gap-40 w-full p-3'>
        <BoxDash>
        <div className='flex flex-col w-full dash_col'>
            <div className=' font-bold w-full'>New Patients</div>
            <div className=' flex flex-row justify-between w-full'>
            <div className='text-green-600 font-bold'>125</div>
            <img src={New} alt='new' className='w-6 h-6'></img>
            </div>
            </div>
        </BoxDash>
        <BoxDash>
        <div className='flex flex-col w-full dash_col'>
            <div className=' font-bold w-full'>Active Patients</div>
            <div className=' flex flex-row justify-between w-full'>
            <div className='text-green-600 font-bold'>125</div>
            <img src={Active} alt='new' className='w-6 h-6'></img>
            </div>
            </div>
        </BoxDash>
        <BoxDash>
        <div className='flex flex-col w-full dash_col'>
            <div className=' font-bold w-full'>Total Patients</div>
            <div className=' flex flex-row justify-between w-full'>
            <div className='text-green-600 font-bold'>125</div>
            <img src={Totalpatients} alt='new' className='w-6 h-6'></img>
            </div>
            </div>
        </BoxDash>
        <BoxDash>
        <div className='flex flex-col w-full dash_col'>
            <div className=' font-bold w-full'>Visitors</div>
            <div className=' flex flex-row justify-between w-full'>
            <div className='text-green-600 font-bold'>125</div>
            <img src={Visitors} alt='new' className='w-6 h-6'></img>
            </div>
            </div>
        </BoxDash>
    </div>


    
  )
}

export default Dashboard

const BoxDash=({children})=>{
    return(<div className='dash_col rounded-md p-4 flex-1 border border-gray-300 flex items-center h-20 w-4/5 s:w-full'>{children}</div>)
}