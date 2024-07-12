
# Charak's Health Monitoring System

- Our Github Repo: https://github.com/varunbalaji167/Siddhi_health_app_monitoring.git or https://github.com/code-abhash/Siddhi_health_app_monitoring.git

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Project Overview

This project is a full-stack application for real-time monitoring of patient vitals using a bedside tablet for vitals recording and real-time analysis. The project consists of the following parts:

- **Frontend**: Built with React, Vite, and Tailwind CSS.
- **Backend**: Developed using Django and Django REST Framework.
- **ML Model Integration**: Flask is used to integrate and serve machine learning models.

## Features

- Real-time patient vital monitoring
- Vitals recording and visualization
- User authentication and authorization
- CRUD operations for patient records
- Integration of machine learning models for data analysis

## Tech Stack

**Frontend:**

- React
- Vite
- Tailwind CSS

**Backend:**

- Django
- Django REST Framework

**ML Model Integration:**

- Flask


## Simplified Folder Structure

### Frontend

If you want to see the Frontend portion of the project, check out the [frontend folder](./frontend).
```
.
├── Auth_contxt
│   └── Authcontext.jsx
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── logo.png
│   │   └── react.svg
│   ├── components
│   │   ├── Disease-Summary
│   │   │   ├── AddDetails.jsx
│   │   │   ├── DeatilsShow.jsx
│   │   │   ├── Disease-summary.jsx
│   │   │   └── Disease_page.jsx
│   │   ├── Footer.jsx
│   │   ├── Home
│   │   │   ├── Blood.jsx
│   │   │   ├── Heart.jsx
│   │   │   ├── Home.css
│   │   │   ├── Home.jsx
│   │   │   ├── HomePageImages.jsx
│   │   │   ├── ImgCol.jsx
│   │   │   ├── List.json
│   │   │   ├── Navbar.jsx
│   │   │   ├── Panel.jsx
│   │   │   ├── Realtime.jsx
│   │   │   ├── RespRate.jsx
│   │   │   ├── Spo2.jsx
│   │   │   ├── Temp.jsx
│   │   │   └── img
│   │   │       ├── Charak1.jpg
│   │   │       ├── Charak2.png
│   │   │       ├── Charak3.png
│   │   │       ├── Charak4.jpg
│   │   │       ├── Charak6.jpeg
│   │   │       ├── down-arrow.svg
│   │   │       ├── img3.jpg
│   │   │       └── logo.png
│   │   ├── Infobutton
│   │   │   └── Infobutton.jsx
│   │   ├── Patient-Records
│   │   │   ├── AddNewPatient.jsx
│   │   │   ├── PatientRecordsData.jsx
│   │   │   └── PatientRecordsTab.jsx
│   │   ├── Patients
│   │   │   ├── PatientInfo.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── img
│   │   │       └── patient.png
│   │   ├── ProfileUser
│   │   │   └── ImageSpec.jsx
│   │   ├── VitalsEntry
│   │   │   ├── BodyTemperatureButton.jsx
│   │   │   ├── Dataentry.css
│   │   │   ├── Dataentry.jsx
│   │   │   ├── DiastolicBPButton.jsx
│   │   │   ├── HeartRateButton.jsx
│   │   │   ├── RespiratoryRateButton.jsx
│   │   │   ├── SPO2Button.jsx
│   │   │   └── SystolicBPButton.jsx
│   │   └── auth
│   │       ├── Auth.css
│   │       ├── CustomSwal.css
│   │       ├── Login.jsx
│   │       ├── PasswordRequest.jsx
│   │       ├── PasswordResetConfirm.jsx
│   │       ├── Signup.jsx
│   │       └── img
│   │           ├── BG.jpeg
│   │           ├── bg.jpg
│   │           ├── logo.jpg
│   │           └── logo.png
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── utils
│   ├── PrivateRoute.jsx
│   └── useAxios.jsx
└── vite.config.js
```
18 directories, 69 files

### Backend

If you want to see the backend portion of the project, check out the [backend folder](./backend).
```
.
├── README.md
├── __pycache__
│   └── app.cpython-312.pyc
├── api
│   ├── __init__.py
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── app.py
├── backend
│   ├── __init__.py
│   ├── __pycache__
│   ├── asgi.py
│   ├── requirements.txt
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── llm_api.py
├── manage.py
├── media
│   └── profile_images
├── model_asthama.h5
├── model_asthama_less.h5
├── model_cough.h5
├── model_cough_less.h5
├── model_diarrhea.h5
├── model_diarrhea_less.h5
├── model_fever.h5
├── model_fever_brave.h5
├── model_fever_less.h5
├── model_pnuemonia.h5
├── model_pnuemonia_less.h5
├── requirements.txt
├── scalar_function_asthama.pkl
├── scalar_function_cough.pkl
├── scalar_function_diarrhea.pkl
├── scalar_function_fever.pkl
├── scalar_function_pnuemonia.pkl
└── venv
    ├── bin
    ├── lib
    └── pyvenv.cfg
```
12 directories, 38 files
## Installation

- Please run these 3 servers in split terminals
- Make sure you have installed node.js,npm,python,pip in your Machine
- We have requirements.txt file which downloads the entire dependencies required for both django and flask
### Frontend

1. Clone the repository:
   ```bash
   git clone <https://github.com/varunbalaji167/Siddhi_health_app_monitoring.git>
   cd frontend
   ```
2.	Install dependencies and run the server:   
    ```bash
    npm install
    npm run dev
    ```

### Backend

1. Set up your own virtual environment in backend folder:
   ```bash
   cd backend
   python -m venv venv
   On Mac: source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies, apply migrations and start the server
   ```bash
   pip install -r requirements.txt
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver

### Ml Model Integration

1. Activate the installed virtual environment in backend folder:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies and run the flask:
   ```bash
   pip install -r requirements.txt   # already installed when dealing with backend server
   flask run # python app.py
   ```
    
## API Endpoints

### Backend (Django REST Framework)

	•	GET /api/patients/: List all patients.
	•	POST /api/patients/: Add a new patient.
	•	GET /api/patients/{id}/: Get details of a specific patient.
	•	PUT /api/patients/{id}/: Update a specific patient.
	•	DELETE /api/patients/{id}/: Delete a specific patient.

### ML Model (Flask)

	•	POST /predict: Predict using the ML model.

- For more brief details please go through [Backend Readme File](./backend/README.md) and [Frontend Readme File](./frontend/README.md)   