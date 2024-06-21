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

const SPO2Button = (props) => {
  const [spo2Value, setSpo2Value] = useState(95); // Default to average normal SPO2 value
  props.getspo2Value(spo2Value)

  // Function to handle slider change
  const handleSliderChange = (event) => {
    setSpo2Value(event.target.value);
  };

  // Function to handle direct input change
  const handleInputChange = (event) => {
    const value = Math.max(80, Math.min(100, Number(event.target.value)));
    setSpo2Value(value);
  };

  return (
    <div className="sm:col-span-3  p-4 rounded-xl shadow-lg">
      <style>{arrowStyles}</style>
      <label
        htmlFor="spo2"
        className="block text-lg font-semibold leading-6 text-gray-900"
      >
        SPO2 (%)
        <Infobutton message="Enter saturated oxygen value (SPO2) of patients using the slider or by using the arrows." />
      </label>
      <div className="mt-2 flex justify-center items-center">
        <input
          type="range"
          name="spo2"
          id="spo2"
          min="80"
          max="100"
          value={spo2Value}
          onChange={handleSliderChange}
          className="form-range h-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          name="spo2"
          id="spo2"
          value={spo2Value}
          onChange={handleInputChange}
          className="form-input ml-4 block w-24 text-center border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="80"
          max="100"
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-xl font-medium text-gray-900">
          Selected SPO2%: <span className="text-indigo-600">{spo2Value}%</span>
        </span>
      </div>
    </div>
  );
};

export default SPO2Button;
