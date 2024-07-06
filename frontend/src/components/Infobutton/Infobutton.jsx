import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Infobutton = ({ message }) => {
    const [showTooltip, setShowTooltip] = useState(false); // State to manage tooltip visibility

    return (
        <div className="relative font-roboto inline-block">
            {/* Button to trigger tooltip */}
            <button
                onMouseEnter={() => setShowTooltip(true)} // Show tooltip on mouse enter
                onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
                className="hover:text-gray-700 focus:outline-none"
            >
                <FontAwesomeIcon icon={faCircleInfo} />
            </button>
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50 ml-20 w-72 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                    {/* Render each line of the message */}
                    {message.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Infobutton;