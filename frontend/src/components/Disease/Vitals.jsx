import React from 'react'

const Vitals = () => {
  return (
    <div className='flex flex-row justify-between items-center bg-blue-100 w-full'>
        <div className='font-extrabold underline'>Vitals Sign</div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 sm:w-1/3 sm:h-1/6 sm:mr-96 sm:m-5">
        <div className="flex items-center justify-center border border-gray-300  bg-slate-200 shadow p-4 font-bold rounded-md">
          HEART RATE
        </div>
        <div className="flex items-center justify-center border border-gray-300  bg-slate-200 shadow p-4 font-bold rounded-md">
          BLOOD PRESSURE
        </div>
        <div className="flex items-center justify-center border border-gray-300  bg-slate-200 shadow p-4 font-bold rounded-md">
          TEMPERATUE
        </div>
        <div className="flex items-center justify-center border border-gray-300  bg-slate-200 shadow p-4 font-bold rounded-md">
          %Spo2
        </div>
      </div>
    </div>
  )
}

export default Vitals