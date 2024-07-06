import React from 'react'
import AddPatientForm from './AddNewPatient'
import PatientDetailsTable from './PatientRecordsData'
import Navbar from '../Home/Navbar'
import Footer from '../Footer'

const PatientRecordsTab = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <header className="w-full">
    <Navbar />
  </header>

  <main className="flex-grow mt-4 p-4 bg-gray-100">
    <div className="max-w-7xl mx-auto">
      <AddPatientForm />
      <div className="mt-8">
        <PatientDetailsTable />
      </div>
    </div>
  </main>

  <footer className="w-full mt-4">
    <Footer />
  </footer>
</div>
  )
}

export default PatientRecordsTab
