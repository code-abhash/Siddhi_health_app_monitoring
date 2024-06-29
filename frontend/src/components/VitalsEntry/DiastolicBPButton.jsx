import React, { useState } from "react";
import Infobutton from "../Infobutton/Infobutton";

const arrowStyles = `
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: inner-spin-button !important;
  opacity: 1;
  position: absolute;
  right: 2px; /* Adjust as needed */
  width: 15px; /* Adjust as needed */
  height: 100%;
}

input[type='number'] {
  -moz-appearance: textfield; /* For Firefox */
  appearance: textfield;
}

`;


const DiastolicBPButton = (props) => {
  const [diastolicBP, setDiastolicBP] = useState(80); // Default to average normal diastolic BP
  props.getdiastolicBP(diastolicBP)
  // Function to handle slider change
  const handleSliderChange = (event) => {
    setDiastolicBP(event.target.value);
  };

  // Function to handle direct input change
  const handleInputChange = (event) => {
    const value = Math.max(30, Math.min(130, Number(event.target.value)));
    setDiastolicBP(value);
  };

  return (
    <div className="sm:col-span-3 font-roboto  p-4 rounded-xl shadow-lg">
      <style>{arrowStyles}</style>
      <label
        htmlFor="diastolic-bp"
        className="block text-lg font-semibold leading-6 text-gray-900"
      >
        Diastolic BP (mm Hg)
        <Infobutton message="Enter the Diastolic value of BP of Patients using the slider or by using the arrows." />
      </label>
      <div className="mt-2 flex justify-center items-center">
        <input
          type="range"
          name="diastolic-bp"
          id="diastolic-bp"
          min="30"
          max="130"
          value={diastolicBP}
          onChange={handleSliderChange}
          className="form-range h-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          name="diastolic-bp"
          id="diastolic-bp"
          value={diastolicBP}
          onChange={handleInputChange}
          className="form-input ml-4 block w-24 text-center border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="30"
          max="130"
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-xl font-medium text-gray-900">
          Selected Diastolic BP: <span className="text-indigo-600">{diastolicBP} mm Hg</span>
        </span>
      </div>
    </div>
  );
};

export default DiastolicBPButton;

