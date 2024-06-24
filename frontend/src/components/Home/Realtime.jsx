import React from "react";
import HeartRateChart from "./Heart";
import BloodPressureChart from "./Blood";
import SPO2Chart from "./Spo2";
import TempChart from "./Temp";
import RespRateChart from "./RespRate";

const Realtime = ({patientId}) => {
  return (
    <>
      <div className="flex font-roboto flex-col items-center gap-8 lg:grid grid-cols-2 grid-rows-2 h-auto p-5">
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Heart Beat (bpm)</h2>
          <HeartRateChart patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Blood Pressure (mm Hg)</h2>
          <BloodPressureChart patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Spo2 (%)</h2>
          <SPO2Chart patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Temperature (°F)</h2>
          <TempChart patientId={patientId}/>
        </div>
        <div className="m-3 w-full lg:w-4/5 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Respiration Rate</h2>
          <RespRateChart patientId={patientId}/>
        </div>
      </div>
    </>
  );
};

export default Realtime;
