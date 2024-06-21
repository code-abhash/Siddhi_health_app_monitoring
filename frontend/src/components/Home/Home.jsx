import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Realtime from "./Realtime";
import Panel from "./Panel";
import Infobutton from "../Infobutton/Infobutton";
import "./Home.css";
import Footer from '../Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="font-roboto flex flex-col gap-8 home_page bg-gray-50 text-gray-700">
      <div className="shadow-md">
        <Navbar />
      </div>
      <div className="p-4">
        <p className="text-xl font-bold mb-2">Dashboard <Infobutton message={`This dashboard has info like:
- New Patients: It tells about new patients enrolled 
- Active Patients: It tells about the patients still active
- Total Patients: Total aptients number
- Visitors: New visitors numbers`}/></p>
        <Dashboard />
      </div>
      {/* <div className="p-4">
        <p className="text-xl font-bold mb-2">Disease Panel <Infobutton message={`This is disease panel with drop down to select disease.
          The health status button to go to disaese summary page`}/></p>
        <Panel />
      </div> */}
      {/* <div className="p-4">
        <p className="text-xl font-bold mb-2">Real Time Analysis <Infobutton message={`This has the real time graphs showing the vitals vs days line graph.
          -Heart beat
          -blood pressure
          -spo2
          -Temperature`}/></p>
        <Realtime />
      </div> */}
      <div className="p-4">
        <p className="text-xl font-bold mb-2">Your Personal Health Tracker <Infobutton message={`This is the section of homepage that would give introduction of our web app.
        It also has link to patient page.
        `}/></p><p className="ml-2 text-gray-500 text-[16.5px]">
          Welcome to the web app, a sophisticated personal health tracker that revolutionizes how you manage your well-being. Our intuitive interface offers seamless real-time monitoring of crucial health metrics such as heart rate variability, blood pressure trends, and sleep quality patterns. These insights empower you to make informed decisions about your health and lifestyle, fostering proactive health management. It will help to store the patients data and it would help medical professionals to easily monitor patients. It would even give them a user-friendly interface to store patients vitals record and also monitor them. Beyond monitoring, it supports personalized goal-setting tailored to your unique health objectives. Track your progress effortlessly with detailed analytics and visual representations of your health data over time. Whether you're striving to improve cardiovascular fitness, manage stress levels, or achieve better sleep hygiene, our app provides the tools and motivation to succeed.
        {/* <Realtime /> */}
        </p>
        <div className="flex flex-row align-baseline ml-2 mt-8">
          <div className="mt-6 text-gray-500 text-[16.5px] hidden sm:block">You can navigate to patients details:</div>
        <button
          className="font-bold bg-blue-600 text-white px-6 py-2 text-lg tracking-wider hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out ml-2"
          onClick={() => navigate('/patients')}
        >
          Click Here to Know Patients Details<FontAwesomeIcon icon={faUpRightFromSquare} className="ml-2"/>
        </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;


