# Django Backend Project

- Our Github Repo: https://github.com/varunbalaji167/Siddhi_health_app_monitoring.git or https://github.com/code-abhash/Siddhi_health_app_monitoring.git

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Patients](#patients)
  - [User Profile](#user-profile)
  - [Patient Vitals and Info](#patient-vitals-and-info)
  - [Patients Descriptions](#patients-descriptions)

## Introduction
This project is a Django-based backend application for managing patient information. It provides APIs for user authentication, patient records management, and integration with a React frontend for a complete patient information system.

## Features
- User Authentication (Register, Login, Password Reset)
- CRUD operations for patient records
- Integration with React frontend
- API endpoints for managing patient data
- Role-based access control

## Requirements
- Django==5.0.3
- djangorestframework==3.15.1
- djangorestframework_simplejwt==5.3.1
- python-dotenv==1.0.1
- rest_framework_simplejwt==0.0.2
- asgiref
- django-cors-headers
- PyJWT
- pytz
- sqlparse
- psycopg2-binary
- django-jazzmin
- Flask
- Flask-cors
- numpy
- tensorflow
- joblib
- Pytorch

## Installation


### Steps to start backend

Step 1 : Clone the repository
      ```bash
      git clone https://github.com/code-abhash/Siddhi_health_app_monitoring.git
      ```

Step 2 : Creating a env folder 
    ```bash
    -To create env file; python -m venv env
    -Activate env: source env/bin/activate(in Linux)   
    -Activate env: env\Scripts\activate(in windows)
    ```

Step 3 : Install all requirement
    ```bash
    -pip install -r requirements.txt
    ```

Step 4 : Makeing migrations
    ```bash
    -python manage.py makemigrations
    -python manage.py migrate
    ```

Step 5 : Runserver
    ```bash
    -python manage.py runserver
    ```


### USAGE AND API ENDPOINTS
 
***Authentication***


**1. User Registration:**

      -Method: Post
      -views: RegisterView
      -Endpoints: http://127.0.0.1:8000/api/register/
      -Description: This api is fetched in frontend to registering a new user 
        
**2. User Login:**

      Method: Post
      views: MyTokenObtainPairView
      Endpoint : http://127.0.0.1:8000/api/token/
      Description: This endpoint is fetched in frontend and then token is generated to login user


**3. Reset Password:**

        Method: Post
        views: PasswordResetView, PasswordResetConfirmView
        Endpoint_PasswordResetView: http://127.0.0.1:8000/api/password_reset/
        Endpoint_PasswordResetConfirmView: http://127.0.0.1:8000/api/reset/<str:username>/<str:token>/
        Description: Here we send request to gmail of user to send request to change password after sending we click on second url link send to gmail it will help us to change password

**4.Get Login User:**

        Method: GET
        views: userList
        Endpoint: http://127.0.0.1:8000/api/users
        Description: Through this api endpoint we can get all the user that have registered and access them so that while logging in we redirect basis of role

***Patients Create***


**1. Creating New Patients**

        Method: POST
        Views: PatientlistCreate
        Endpoint: http://127.0.0.1:8000/api/patientslistcreate/
        Description: Here we can create a new patient and post all details of particular patient


**2. Fetch Patients**

        Method: GET
        views: patientslist
        Endpoint: http://127.0.0.1:8000/api/patientslist/
        Description: We fetch all patient details to show in table

**3. Updating and deleting patient details:**

        Method: PUT and DELETE 
        views: patient_details
        Endpoint: http://127.0.0.1:8000/api/patients/<str:patient_id>/
        Description: We fetch paitents on basis of patient id and then we carry out update and delete operations 

        User Profile
        - After signup the user will be able to make profile 

**1.Creating Profile**

        Method: POST
        views: ProfileCreate
        Endpoint: http://127.0.0.1:8000/api/profiles/
        Description: We will be able to make profile and post all details regarding patient here.

**2.Updating and getting user info**

        Method: GET and PUT
        views: ProfileDetail
        Endpoint: http://127.0.0.1:8000/api/profiles/<str:username>/
        Description: Here this api endpoint can be fetched in frontend to update and get profile of user

**3. Create a endpoint to get only patient id , name and doctor name so that they can be accessed in dropdown**

        Method: GET
        Views: PatientDropList
        Endpoint: http://127.0.0.1:8000/api/patientdrop/
        Description: It will help us to fetch few details of patient so that we can use them in dropdown

***Patient vitals and info***

**1. Vitals entry of patient on basis of patient id**

        Method: POST
        Views: patient_records_create
        Endpoint: http://127.0.0.1:8000/api/patientsrecordlist/
        Description: We will fetch it and then we can enter vitals of patients and also medications

**2. Patients info and recent vitals fetch**

        Method: Get
        Views: get_patient_info
        Endpoint: http://127.0.0.1:8000/api/patientinfo/<str:patient_id>/
        Description: Through this api endpoint we fetch patientdetails and also get most recent vitals on the basis of patientid

**3. Get all vitals of patient**

        Method: Get
        Views: get_patient_vitals
        Endpoint: http://127.0.0.1:8000/api/v1/patients/<str:patientId>/vitals
        Description: Through this endpoint we get all the vitals and the fucntion written in views.py is based on filter of day, week  and months on basis of patientid

**4. Patients Descriptions**

        Method: POST, GET and PUT
        Views: patient_description
        Endpoint_POST: http://127.0.0.1:8000/api/patient_description/
        Endpoint_PUT_GET: http://127.0.0.1:8000/api/patient_description/<str:patient_id>/
        Description: In patient_description we have made POST, PUT and GET here in POST we store description about patient disease and in PUT and GET we made a function to update and fetch all descriptions.


### Flask Endpoints:

      **1.Analysis Endpoint:** http://127.0.0.1:8001/api/v1/analysis
        Method: POST
        Discription: This endpoint accepts a JSON payload containing a dataframe of vitals and returns an analysis of the data, identifying trends and anomalies.
      **2.Prediction Endpoint:** http://localhost:5000/predict
        Method: POST
        Discription: This endpoint accepts patient vitals data and returns predictions for various health conditions such as asthma, diarrhea, pneumonia, fever, and cough.

### Documentations or refrences: 

1. Django documentations: https://docs.djangoproject.com/en/5.0/
2. Flask documentations: https://flask.palletsprojects.com/en/3.0.x/
