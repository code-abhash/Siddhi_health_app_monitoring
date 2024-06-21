from django.shortcuts import render
from api.models import Profile, User, Patient, PatientRecords
from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer,PatientRecordsSerializer,PatientDropSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse





# Create your views here


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    permission_classes=([AllowAny])
    serializer_class=RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
        '/api/patientslist'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method=="GET":
        response = f"Hey {request.User}, You are seeing a GET response"
        return Response({'response':response}, status=status.HTTP_200_ok)
    
    elif request.method == 'POST':
        text = response.POST.get("text")
        response = f"Hey{request.user}, Your text is {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class PatientlistCreate(generics.CreateAPIView):
    queryset=Patient.objects.all()
    permission_classes=([AllowAny])
    serializer_class=PatientSerializer


@api_view(['GET','POST'])
def patientslist(request):
    if request.method== 'GET':
        patients=Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class PatientRecordsListCreate(generics.ListCreateAPIView):
#     queryset = PatientRecords.objects.all()
#     permission_classes=([AllowAny])
#     serializer_class = PatientRecordsSerializer

# @api_view(['GET','POST'])
# def patientrecordlist(request):
#     if request.method== 'GET':
#         patientrecords=PatientRecords.objects.all()
#         serializer = PatientRecordsSerializer(patientrecords, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
        
#         serializer = PatientRecordsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class PatientListView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class PatientRecordsListView(generics.CreateAPIView):
#     def post(self, request, *args, **kwargs):
#         patient_id = request.data.get('patientId')
#         patient = get_object_or_404(Patient, patientId=patient_id)
#         serializer = PatientRecordsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(patient=patient)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientDropList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDropSerializer

class PatientRecordsListCreate(generics.ListCreateAPIView):
    queryset = PatientRecords.objects.all()
    serializer_class = PatientRecordsSerializer


# @api_view(['GET','POST'])
# def patientsrecordlist(request):
#     if request.method== 'GET':
#         patientrecords=PatientRecords.objects.all()
#         serializer = PatientRecordsSerializer(patientrecords, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = PatientRecordsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def patient_records_create(request):
    serializer = PatientRecordsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def patient_records_list(request):
    patientrecords=PatientRecords.objects.all()
    serializer = PatientRecordsSerializer(patientrecords, many=True)
    return Response(serializer.data)

# def get_patient_data(request, patient_id):
#     patient = get_object_or_404(Patient, patientId=patient_id)
#     data = {
#         'patientId': patient.patientId,
#         'patientName': patient.patientName,
#         'doctorName': patient.doctorName,
#         'medConditions': patient.medConditions,
#         'location': patient.location,
#         'medication': patient.medication,
#         'pastMedHis': patient.pastMedHis,
#         'patientAge': patient.patientAge,
#         'patientHeight': patient.patientHeight,
#         'patientSex': patient.patientSex,
#         'patientBloodGroup': patient.patientBloodGroup,
#     }
#     return JsonResponse(data)

# def get_patient_records(request, patient_id):
#     patient_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()
#     if patient_record:
#         record = {
#             'patientId': patient_record.patientId,
#             'appointmentDate': patient_record.appointmentDate,
#             'appointmentTime': patient_record.appointmentTime,
#             'heartRate': patient_record.heartRate,
#             'diastolicBP': patient_record.diastolicBP,
#             'systolicBP': patient_record.systolicBP,
#             'bodyTemp': patient_record.bodyTemp,
#             'spo2Value': patient_record.spo2Value,
#         }
#     else:
#         record = {}
#     return JsonResponse(record)

def get_patient_info(request, patient_id):
    patient = get_object_or_404(Patient, patientId=patient_id)
    recent_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()

    patient_data = {
        'patientId': patient.patientId,
        'patientName': patient.patientName,
        'doctorName': patient.doctorName,
        'medConditions': patient.medConditions,
        'location': patient.location,
        'medication': patient.medication,
        'pastMedHis': patient.pastMedHis,
        'patientAge': patient.patientAge,
        'patientHeight': patient.patientHeight,
        'patientSex': patient.patientSex,
        'patientBloodGroup': patient.patientBloodGroup,
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
        }
    else:
        recent_record_data = {}

    data = {
        'patientData': patient_data,
        'recentRecord': recent_record_data
    }

    return JsonResponse(data)

# def get_val_chart(request, patient_id):
#     patient_record = PatientRecords.objects.filter(patientId=patient_id)
#     if patient_record:
#         record = {
#             'patientId': patient_record.patientId,
#             'appointmentDate': patient_record.appointmentDate,
#             'appointmentTime': patient_record.appointmentTime,
#             'heartRate': patient_record.heartRate,
#             'diastolicBP': patient_record.diastolicBP,
#             'systolicBP': patient_record.systolicBP,
#             'bodyTemp': patient_record.bodyTemp,
#             'spo2Value': patient_record.spo2Value,
#         }
#     else:
#         record = {}
#     return JsonResponse(record)

# def get_val_chart(request, patient_id):
#     try:
        # Query patient record filtered by patientId
    #     patient_record = PatientRecords.objects.filter(patientId=patient_id)
        
    #     if patient_record:
    #         # Extract specific fields from the patient record
    #         record = {
    #             'patientId': patient_record.patientId,
    #             'appointmentDate': patient_record.appointmentDate,
    #             'appointmentTime': patient_record.appointmentTime.strftime('%H:%M'),  # Format time if needed
    #             'heartRate': patient_record.heartRate,
    #             'diastolicBP': patient_record.diastolicBP,
    #             'systolicBP': patient_record.systolicBP,
    #             'bodyTemp': patient_record.bodyTemp,
    #             'spo2Value': patient_record.spo2Value,
    #         }

    #         return JsonResponse(record)
    #     else:
    #         return JsonResponse({'error': 'Patient record not found.'}, status=404)
    # except Exception as e:
    #     return JsonResponse({'error': str(e)}, status=500)


def get_val_chart(request, patient_id):
    try:
        # Query all patient records filtered by patientId
        patient_records = PatientRecords.objects.filter(patientId=patient_id)

        # Serialize queryset using PatientRecordsSerializer
        serializer = PatientRecordsSerializer(patient_records, many=True)
        serialized_data = serializer.data

        if serialized_data:
            return JsonResponse(serialized_data, safe=False)
        else:
            return JsonResponse({'error': 'No records found for the patient.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)