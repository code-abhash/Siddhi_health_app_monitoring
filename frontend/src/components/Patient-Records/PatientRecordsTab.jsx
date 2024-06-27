
import React from 'react'
import AddPatientForm from './AddNewPatient'
import PatientDetailsTable from './PatientRecordsData'
import Navbar from '../Home/Navbar'
import Footer from '../Footer'

const PatientRecordsTab = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
        <AddPatientForm />
        <PatientDetailsTable />
        <div className='mt-20'>
      <Footer />
      </div>
    </div>
  )
}

export default PatientRecordsTab
