# Patient Health Monitoring Frontend

The frontend is developed using React, Vite, and Tailwind CSS. The system is designed to record patient vitals using a bedside tablet and provide real-time analysis.

The Patient Health Monitoring system is a comprehensive solution designed to track and analyze patient vitals in real-time. This Readme file of the project focuses on the frontend application, which provides an intuitive user interface for healthcare professionals to monitor patient data and manage health records.


## Features

- Real-time vitals recording and instant predictions along with analysis
- Interactive and responsive user interface
- Integration with backend services for data persistence and retrieval
- Easy-to-use forms for data entry and patient management
- Provides digital records of patients information and their medical descriptions given

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js
- npm

## Installation

1. Clone my repository
```bash
  git clone https://github.com/varunbalaji167/siddhi_health_app_monitoring.git
  cd siddhi_health_app_monitoring
  cd frontend
```
2. Install the dependencies and run the server

```bash
  npm install 
  npm run dev
```
The application will be available at http://localhost:3000 on your machine
    
## Frontend Folder Structure
```
.
├── Auth_contxt
│ └── Authcontext.jsx
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│ └── vite.svg
├── src
│ ├── App.jsx
│ ├── assets
│ │ ├── logo.png
│ │ └── react.svg
│ ├── components
│ │ ├── Disease-Summary
│ │ │ ├── AddDetails.jsx
│ │ │ ├── DeatilsShow.jsx
│ │ │ ├── Disease-summary.jsx
│ │ │ └── Disease_page.jsx
│ │ ├── Footer.jsx
│ │ ├── Home
│ │ │ ├── Blood.jsx
│ │ │ ├── Heart.jsx
│ │ │ ├── Home.css
│ │ │ ├── Home.jsx
│ │ │ ├── HomePageImages.jsx
│ │ │ ├── ImgCol.jsx
│ │ │ ├── List.json
│ │ │ ├── Navbar.jsx
│ │ │ ├── Panel.jsx
│ │ │ ├── Realtime.jsx
│ │ │ ├── RespRate.jsx
│ │ │ ├── Spo2.jsx
│ │ │ ├── Temp.jsx
│ │ │ └── img
│ │ │ ├── Charak1.jpg
│ │ │ ├── Charak2.png
│ │ │ ├── Charak3.png
│ │ │ ├── Charak4.jpg
│ │ │ ├── Charak6.jpeg
│ │ │ ├── down-arrow.svg
│ │ │ ├── img3.jpg
│ │ │ └── logo.png
│ │ ├── Infobutton
│ │ │ └── Infobutton.jsx
│ │ ├── Patient-Records
│ │ │ ├── AddNewPatient.jsx
│ │ │ ├── PatientRecordsData.jsx
│ │ │ └── PatientRecordsTab.jsx
│ │ ├── Patients
│ │ │ ├── PatientInfo.jsx
│ │ │ ├── Patients.jsx
│ │ │ ├── Sidebar.jsx
│ │ │ └── img
│ │ │ └── patient.png
│ │ ├── ProfileUser
│ │ │ └── ImageSpec.jsx
│ │ ├── VitalsEntry
│ │ │ ├── BodyTemperatureButton.jsx
│ │ │ ├── Dataentry.css
│ │ │ ├── Dataentry.jsx
│ │ │ ├── DiastolicBPButton.jsx
│ │ │ ├── HeartRateButton.jsx
│ │ │ ├── RespiratoryRateButton.jsx
│ │ │ ├── SPO2Button.jsx
│ │ │ └── SystolicBPButton.jsx
│ │ └── auth
│ │ ├── Auth.css
│ │ ├── CustomSwal.css
│ │ ├── Login.jsx
│ │ ├── PasswordRequest.jsx
│ │ ├── PasswordResetConfirm.jsx
│ │ ├── Signup.jsx
│ │ └── img
│ │ ├── BG.jpeg
│ │ ├── bg.jpg
│ │ ├── logo.jpg
│ │ └── logo.png
│ ├── index.css
│ └── main.jsx
├── tailwind.config.js
├── utils
│ ├── PrivateRoute.jsx
│ └── useAxios.jsx
└── vite.config.js
```
18 directories, 69 files

- public/: Contains the HTML file and static assets.
- src/: Contains the main codebase including components, pages, and styles.
- App.jsx: The root component.
- main.jsx: The entry point of the application.
- components/: Reusable UI components.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI development.

## Documentation of Techstakes used


**React.js** : https://react.dev/reference/react
**Tailwind CSS** : https://tailwindcss.com/showcase
**Javascript** : https://developer.mozilla.org/en-US/docs/Web/JavaScript
**npm** : https://docs.npmjs.com
**react-chartjs-2** : https://www.npmjs.com/package/react-chartjs-2
**Chart.js** : https://www.chartjs.org/docs/latest/getting-started/integration.html