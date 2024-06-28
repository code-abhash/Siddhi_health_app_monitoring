import React from 'react'

const Deails_page = () => {
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-800 mb-2">Description</h3>
      <p> No description available.</p>
    </div>
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-800 mb-2">Treatment</h3>
      <p>No treatment information available.</p>
    </div>
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-800 mb-2">Diagnosis</h3>
      <p>'No diagnosis information available.</p>
    </div>
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-800 mb-2">Symptoms</h3>
      <p>No symptoms information available.</p>
    </div>
  </div>
    </div>
  )
}

export default Deails_page
