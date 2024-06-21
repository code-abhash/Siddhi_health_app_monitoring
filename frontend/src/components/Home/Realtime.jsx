import React from "react";
import Heart from "./Heart";
import Blood from "./Blood";
import Spo2 from "./Spo2";
import Temp from "./Temp";

const Realtime = ({patientId}) => {
  return (
    <>
      <div className="flex font-roboto flex-col items-center gap-8 lg:grid grid-cols-2 grid-rows-2 h-auto p-5">
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Heart Beat (bpm)</h2>
          <Heart patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Blood Pressure (mm Hg)</h2>
          <Blood patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Spo2 (%)</h2>
          <Spo2 patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Temperature (°F)</h2>
          <Temp patientId={patientId}/>
        </div>
      </div>
    </>
  );
};

export default Realtime;
