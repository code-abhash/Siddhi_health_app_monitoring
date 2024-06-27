
import React from 'react';
import { useState } from 'react';
import patientIcon from "./img/patient.png";
import Panel from '../Home/Panel';

const Header = ({ patientId }) => {
  

  
  return (
    <header className="bg-gray-600 font-roboto p-5 flex justify-between items-center">
      <div><h1 className="text-white text-2xl font-semibold">#{patientId}</h1></div>
      <div><button className="bg-gray-400 rounded-full p-3">
        <img
          src={patientIcon}
          alt="Edit Patient"
          title="Edit Patient"
          className="object-cover w-10 h-auto border border-transparent rounded-lg"
        />
      </button></div>
    </header>
  );
}

export default Header;