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

const HeartRateButton = (props) => {
  const [heartRate, setHeartRate] = useState("80");
  props.getheartRate(heartRate) // Default to normal heart rate

  // Function to handle slider change
  const handleSliderChange = (event) => {
    setHeartRate(event.target.value);
  };

  // Function to handle direct input change
  const handleInputChange = (event) => {
    const value = Math.max(40, Math.min(180, Number(event.target.value)));
    setHeartRate(value);
  };

  return (
    <div className="sm:col-span-3  p-4 rounded-xl shadow-lg">
      <style>{arrowStyles}</style>
      <label
        htmlFor="heart-rate"
        className="block text-lg font-semibold leading-6 text-gray-900"
      >
        Heart Rate (bpm)
        <Infobutton message="Enter Heart Rate in BPM (beats per minute) of Patients using the slider or by using the arrows." />
      </label>
      <div className="mt-2 flex justify-center items-center">
        <input
          type="range"
          name="heart-rate"
          id="heart-rate"
          min="40"
          max="180"
          value={heartRate}
          onChange={handleSliderChange}
          className="form-range h-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          name="heart-rate"
          id="heart-rate"
          value={heartRate}
          onChange={handleInputChange}
          className="form-input ml-4 block w-24 text-center border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="40"
          max="180"
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-xl font-medium text-gray-900">
          Selected Heart Rate:{" "}
          <span className="text-indigo-600">{heartRate} bpm</span>
        </span>
      </div>
    </div>
  );
};

export default HeartRateButton;
