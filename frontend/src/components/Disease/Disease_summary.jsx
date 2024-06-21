import React from 'react'
import './Disease'

const Disease_summary = () => {
  return (

    <div className=" flex flex-col items-center gap-5 lg:grid grid-cols-2 grid-rows-2 h-screen sm:m-5 bg-blue-200 dis_ease w-full">
        <div className="bg-gray-300 m-3 w-4/5 h-full border-none rounded-md font-bold p-4">Descriptions:<p className='mt-5'>This will gve the description of the disease.</p><p>It will tell about the syptoms</p> </div>
        <div className="bg-gray-300 m-3 w-4/5 h-full border-none rounded-md font-bold p-4">Summary<p className='mt-5'>This will give the summary and brief info about the disease.</p></div>
        <div className="bg-gray-300 m-3 w-4/5 h-full border-none rounded-md font-bold p-4">Diagnosis<p className='mt-5'>It will give info about systematic approach where healthcare professionals use their knowledge and experience to determine the cause of a patient's health problem.</p></div>
        <div className="bg-gray-300 m-3 w-4/5 h-full border-none rounded-md font-bold p-4">Treatment<p className='mt-5'>Treatment refers to the medical management and care given to a patient for an illness, condition, or disease. The goal of treatment is to alleviate symptoms, cure the disease, or improve the patient's overall health and quality of life. </p></div>
      </div>

  )
}

export default Disease_summary