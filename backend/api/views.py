from django.shortcuts import render, get_object_or_404
from api.models import Profile, User, Patient, PatientRecords, PatientDescription
from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer, PatientRecordsSerializer, PatientDropSerializer, PatientDescriptionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from datetime import datetime, timedelta
import json


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

@api_view(['GET'])
def userList(request):
    username = request.query_params.get('username', None)

    if username is not None:
        users = User.objects.filter(username=username)
    else:
        users = User.objects.all()

    serializer = RegisterSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/patientslist',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        response = f"Hey {request.user}, You are seeing a GET response"
        return Response({'response': response}, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        text = request.POST.get("text")
        response = f"Hey {request.user}, Your text is {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


class PatientlistCreate(generics.CreateAPIView):
    queryset = Patient.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PatientSerializer


@api_view(['GET'])
def patientslist(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)


class PatientDropList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDropSerializer


@api_view(['POST'])
def patient_records_create(request):
    serializer = PatientRecordsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def patient_records_list(request):
    patientrecords = PatientRecords.objects.all()
    serializer = PatientRecordsSerializer(patientrecords, many=True)
    return Response(serializer.data)


def get_patient_info(request, patient_id):
    patient = get_object_or_404(Patient, patientId=patient_id)
    recent_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()

    patient_data = {
        'patientId': patient.patientId,
        'patientName': patient.patientName,
        'doctorName': patient.doctorName,
        
        'ward': patient.ward,
        
        'pastMedHis': patient.pastMedHis,
        'patientAge': patient.patientAge,
        'patientHeight': patient.patientHeight,
        'patientSex': patient.patientSex,
        'patientBloodGroup': patient.patientBloodGroup,
        'bed': patient.bed
    }

    if recent_record:
        recent_record_data = {
            'appointmentDate': recent_record.appointmentDate,
            'appointmentTime': recent_record.appointmentTime,
            'heartRate': recent_record.heartRate,
            'diastolicBP': recent_record.diastolicBP,
            'systolicBP': recent_record.systolicBP,
            'bodyTemp': recent_record.bodyTemp,
            'spo2Value': recent_record.spo2Value,
            'respRate': recent_record.respRate,
            'medication': recent_record.medication,
        }
    else:
        recent_record_data = {}

    data = {
        'patientData': patient_data,
        'recentRecord': recent_record_data
    }

    return JsonResponse(data)


@api_view(['GET'])
def get_patient_vitals(request, patientId):
    try:
        filter_type = request.query_params.get('filter_type', None)
        selected_date = request.query_params.get('date', None)
        
        records = PatientRecords.objects.filter(patientId=patientId)

        if filter_type == 'day' and selected_date:
            selected_date = datetime.strptime(selected_date, '%Y-%m-%d').date()
            records = records.filter(appointmentDate=selected_date)
        elif filter_type == 'week':
            today = datetime.today().date()
            start_of_week = today - timedelta(days=today.weekday())
            end_of_week = start_of_week + timedelta(days=6)
            records = records.filter(appointmentDate__range=[start_of_week, end_of_week])
        elif filter_type == 'month':
            today = datetime.today().date()
            start_of_month = today.replace(day=1)
            next_month = start_of_month + timedelta(days=31)
            end_of_month = next_month.replace(day=1) - timedelta(days=1)
            records = records.filter(appointmentDate__range=[start_of_month, end_of_month])

        serializer = PatientRecordsSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except PatientRecords.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, patient_id):
    try:
        patient = Patient.objects.get(patientId=patient_id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST','GET','PUT'])
def patient_description(request, patient_id=None):
    if request.method == 'POST':
        # Create a new patient description
        serializer = PatientDescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    try:
         patient_description = PatientDescription.objects.get(patientId=patient_id)
    except PatientDescription.DoesNotExist:
         return Response({"error": "PatientDescription not found."}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # Retrieve a specific patient description
        serializer = PatientDescriptionSerializer(patient_description)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Update an existing patient description
        serializer = PatientDescriptionSerializer(patient_description, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from api.models import User  # Adjust import to your custom user model
from .serializers import PasswordResetSerializer

class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, username, token):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        password = request.data.get("password")
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()
        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

