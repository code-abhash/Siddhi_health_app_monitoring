import React, { useState } from "react";
import Infobutton from "../Infobutton/Infobutton";

// CSS styles for customizing number input spin buttons
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

const BodyTemperatureButton = (props) => {
  const [bodyTemp, setBodyTemp] = useState(97); // State to manage body temperature, defaulting to 97°F (average normal body temp)

  // Passes current body temperature to parent component using props
  props.getbodyTemp(bodyTemp);

  // Function to handle slider change
  const handleSliderChange = (event) => {
    setBodyTemp(event.target.value); // Updates body temperature based on slider value
  };

  // Function to handle direct input change
  const handleInputChange = (event) => {
    // Limits input range between 80°F and 122°F
    const value = Math.max(80, Math.min(122, Number(event.target.value)));
    setBodyTemp(value); // Updates body temperature with validated input
  };

  return (
    <div className="sm:col-span-3 p-4 rounded-xl shadow-lg">
      {/* Label for body temperature input */}
      <label
        htmlFor="body-temperature"
        className="block text-lg font-semibold leading-6 text-gray-900"
      >
        Body Temperature (°F)
        {/* Information button with tooltip message */}
        <Infobutton message="Enter Body Temperature in °F of Patients Using the slider or by typing the value directly." />
      </label>
      {/* Container for slider and number input */}
      <div className="mt-2 flex justify-center items-center">
        {/* Slider input for selecting body temperature */}
        <input
          type="range"
          name="body-temperature"
          id="body-temperature"
          min="80"
          max="122"
          value={bodyTemp}
          onChange={handleSliderChange}
          className="form-range h-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {/* Number input for entering body temperature */}
        <input
          type="number"
          name="body-temperature"
          id="body-temperature"
          value={bodyTemp}
          onChange={handleInputChange}
          className="form-input ml-4 block w-24 text-center border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="80"
          max="122"
        />
      </div>
      {/* Display selected body temperature */}
      <div className="mt-4 text-center">
        <span className="text-xl font-medium text-gray-900">
          Selected Temperature:{" "}
          <span className="text-indigo-600">{bodyTemp} °F</span>
        </span>
      </div>
    </div>
  );
};

export default BodyTemperatureButton;
