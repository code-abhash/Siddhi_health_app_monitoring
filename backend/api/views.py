# from django.shortcuts import render
# from api.models import Profile, User, Patient, PatientRecords
# from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer,PatientRecordsSerializer,PatientDropSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import generics
# from rest_framework import status
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from django.http import JsonResponse
# from datetime import datetime, timedelta





# # Create your views here


# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class=MyTokenObtainPairSerializer



# class RegisterView(generics.CreateAPIView):
#     queryset=User.objects.all()
#     permission_classes=([AllowAny])
#     serializer_class=RegisterSerializer

# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/'
#         '/api/patientslist'
#     ]
#     return Response(routes)

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def dashboard(request):
#     if request.method=="GET":
#         response = f"Hey {request.User}, You are seeing a GET response"
#         return Response({'response':response}, status=status.HTTP_200_ok)
    
#     elif request.method == 'POST':
#         text = response.POST.get("text")
#         response = f"Hey{request.user}, Your text is {text}"
#         return Response({'response': response}, status=status.HTTP_200_OK)
#     return Response({}, status.HTTP_400_BAD_REQUEST)


# class PatientlistCreate(generics.CreateAPIView):
#     queryset=Patient.objects.all()
#     permission_classes=([AllowAny])
#     serializer_class=PatientSerializer


# @api_view(['GET','POST'])
# def patientslist(request):
#     if request.method== 'GET':
#         patients=Patient.objects.all()
#         serializer = PatientSerializer(patients, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



# class PatientDropList(generics.ListAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientDropSerializer

# class PatientRecordsListCreate(generics.ListCreateAPIView):
#     queryset = PatientRecords.objects.all()
#     serializer_class = PatientRecordsSerializer



# @api_view(['POST'])
# def patient_records_create(request):
#     serializer = PatientRecordsSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)

# @api_view(['GET'])
# def patient_records_list(request):
#     patientrecords=PatientRecords.objects.all()
#     serializer = PatientRecordsSerializer(patientrecords, many=True)
#     return Response(serializer.data)



# def get_patient_info(request, patient_id):
#     patient = get_object_or_404(Patient, patientId=patient_id)
#     recent_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()

#     patient_data = {
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

#     if recent_record:
#         recent_record_data = {
#             'appointmentDate': recent_record.appointmentDate,
#             'appointmentTime': recent_record.appointmentTime,
#             'heartRate': recent_record.heartRate,
#             'diastolicBP': recent_record.diastolicBP,
#             'systolicBP': recent_record.systolicBP,
#             'bodyTemp': recent_record.bodyTemp,
#             'spo2Value': recent_record.spo2Value,
#             'respRate': recent_record.respRate,
#         }
#     else:
#         recent_record_data = {}

#     data = {
#         'patientData': patient_data,
#         'recentRecord': recent_record_data
#     }

#     return JsonResponse(data)


# def get_val_chart(request, patient_id):
#     try:
#         # Query all patient records filtered by patientId
#         patient_records = PatientRecords.objects.filter(patientId=patient_id)

#         # Serialize queryset using PatientRecordsSerializer
#         serializer = PatientRecordsSerializer(patient_records, many=True)
#         serialized_data = serializer.data

#         if serialized_data:
#             return JsonResponse(serialized_data, safe=False)
#         else:
#             return JsonResponse({'error': 'No records found for the patient.'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)
    
# @api_view(['GET'])
# def get_patient_vitals(request, patientId):
#     try:
#         filter_type = request.query_params.get('filter_type', None)

#         records = PatientRecords.objects.filter(patientId=patientId)

#         if filter_type == 'day':
#             records = records.filter(appointmentDate=datetime.now().date())
#         elif filter_type == 'month':
#             records = records.filter(appointmentDate__month=datetime.now().month)
#         elif filter_type == 'week':
#             start_of_week = datetime.now().date() - timedelta(days=datetime.now().weekday())
#             end_of_week = start_of_week + timedelta(days=6)
#             records = records.filter(appointmentDate__gte=start_of_week, appointmentDate__lte=end_of_week)

#         serializer = PatientRecordsSerializer(records, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except PatientRecords.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# from django.shortcuts import render, get_object_or_404
# from api.models import Profile, User, Patient, PatientRecords
# from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer, PatientRecordsSerializer, PatientDropSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import generics, status
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.http import JsonResponse
# from datetime import datetime, timedelta
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.template.loader import render_to_string
# from django.contrib.sites.shortcuts import get_current_site


# # Create your views here

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = RegisterSerializer


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/',
#         '/api/patientslist/'
#     ]
#     return Response(routes)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def dashboard(request):
#     if request.method == "GET":
#         response = f"Hey {request.user}, You are seeing a GET response"
#         return Response({'response': response}, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         text = request.data.get("text")
#         response = f"Hey {request.user}, Your text is {text}"
#         return Response({'response': response}, status=status.HTTP_200_OK)

#     return Response({}, status=status.HTTP_400_BAD_REQUEST)


# class PatientlistCreate(generics.CreateAPIView):
#     queryset = Patient.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = PatientSerializer


# @api_view(['GET', 'POST'])
# def patientslist(request):
#     if request.method == 'GET':
#         patients = Patient.objects.all()
#         serializer = PatientSerializer(patients, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class PatientDropList(generics.ListAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientDropSerializer


# class PatientRecordsListCreate(generics.ListCreateAPIView):
#     queryset = PatientRecords.objects.all()
#     serializer_class = PatientRecordsSerializer


# @api_view(['POST'])
# def patient_records_create(request):
#     serializer = PatientRecordsSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def patient_records_list(request):
#     patientrecords = PatientRecords.objects.all()
#     serializer = PatientRecordsSerializer(patientrecords, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def get_patient_info(request, patient_id):
#     patient = get_object_or_404(Patient, patientId=patient_id)
#     recent_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()

#     patient_data = {
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

#     recent_record_data = {
#         'appointmentDate': recent_record.appointmentDate,
#         'appointmentTime': recent_record.appointmentTime,
#         'heartRate': recent_record.heartRate,
#         'diastolicBP': recent_record.diastolicBP,
#         'systolicBP': recent_record.systolicBP,
#         'bodyTemp': recent_record.bodyTemp,
#         'spo2Value': recent_record.spo2Value,
#         'respRate': recent_record.respRate,
#     } if recent_record else {}

#     data = {
#         'patientData': patient_data,
#         'recentRecord': recent_record_data
#     }

#     return JsonResponse(data)


# @api_view(['GET'])
# def get_val_chart(request, patient_id):
#     try:
#         patient_records = PatientRecords.objects.filter(patientId=patient_id)
#         serializer = PatientRecordsSerializer(patient_records, many=True)
#         serialized_data = serializer.data

#         if serialized_data:
#             return JsonResponse(serialized_data, safe=False)
#         else:
#             return JsonResponse({'error': 'No records found for the patient.'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)


# @api_view(['GET'])
# def get_patient_vitals(request, patientId):
#     try:
#         filter_type = request.query_params.get('filter_type', None)
#         records = PatientRecords.objects.filter(patientId=patientId)

#         if filter_type == 'day':
#             records = records.filter(appointmentDate=datetime.now().date())
#         elif filter_type == 'month':
#             records = records.filter(appointmentDate__month=datetime.now().month)
#         elif filter_type == 'week':
#             start_of_week = datetime.now().date() - timedelta(days=datetime.now().weekday())
#             end_of_week = start_of_week + timedelta(days=6)
#             records = records.filter(appointmentDate__gte=start_of_week, appointmentDate__lte=end_of_week)

#         serializer = PatientRecordsSerializer(records, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except PatientRecords.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class ForgotPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         if not email:
#             return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.filter(email=email).first()
#         if user:
#             token_generator = PasswordResetTokenGenerator()
#             token = token_generator.make_token(user)
#             uid = urlsafe_base64_encode(force_bytes(user.pk))

#             current_site = get_current_site(request)
#             mail_subject = 'Reset your password'
#             message = render_to_string('reset_password_email.html', {
#                 'user': user,
#                 'domain': current_site.domain,
#                 'uid': uid,
#                 'token': token,
#             })
#             send_mail(mail_subject, message, 'noreply@yourdomain.com', [email])

#         return Response({"message": "If an account with that email exists, we have sent you an email with instructions to reset your password."}, status=status.HTTP_200_OK)


# class ResetPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, uidb64, token):
#         password = request.data.get('password')
#         if not password:
#             return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(pk=uid)

#             token_generator = PasswordResetTokenGenerator()
#             if token_generator.check_token(user, token):
#                 user.set_password(password)
#                 user.save()
#                 return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             return Response({"error": "Invalid UID"}, status=status.HTTP_400_BAD_REQUEST)

# from django.shortcuts import render, get_object_or_404
# from api.models import Profile, User, Patient, PatientRecords
# from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer, PatientRecordsSerializer, PatientDropSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import generics, status
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.http import JsonResponse
# from datetime import datetime, timedelta
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.template.loader import render_to_string
# from django.contrib.sites.shortcuts import get_current_site

# # Create your views here

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = RegisterSerializer


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/',
#         '/api/patientslist/'
#     ]
#     return Response(routes)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def dashboard(request):
#     if request.method == "GET":
#         response = f"Hey {request.user}, You are seeing a GET response"
#         return Response({'response': response}, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         text = request.data.get("text")
#         response = f"Hey {request.user}, Your text is {text}"
#         return Response({'response': response}, status=status.HTTP_200_OK)

#     return Response({}, status=status.HTTP_400_BAD_REQUEST)


# class PatientlistCreate(generics.CreateAPIView):
#     queryset = Patient.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = PatientSerializer


# @api_view(['GET', 'POST'])
# def patientslist(request):
#     if request.method == 'GET':
#         patients = Patient.objects.all()
#         serializer = PatientSerializer(patients, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class PatientDropList(generics.ListAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientDropSerializer


# class PatientRecordsListCreate(generics.ListCreateAPIView):
#     queryset = PatientRecords.objects.all()
#     serializer_class = PatientRecordsSerializer


# @api_view(['POST'])
# def patient_records_create(request):
#     serializer = PatientRecordsSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def patient_records_list(request):
#     patientrecords = PatientRecords.objects.all()
#     serializer = PatientRecordsSerializer(patientrecords, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def get_patient_info(request, patient_id):
#     patient = get_object_or_404(Patient, patientId=patient_id)
#     recent_record = PatientRecords.objects.filter(patientId=patient_id).order_by('-appointmentDate', '-appointmentTime').first()

#     patient_data = {
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

#     recent_record_data = {
#         'appointmentDate': recent_record.appointmentDate,
#         'appointmentTime': recent_record.appointmentTime,
#         'heartRate': recent_record.heartRate,
#         'diastolicBP': recent_record.diastolicBP,
#         'systolicBP': recent_record.systolicBP,
#         'bodyTemp': recent_record.bodyTemp,
#         'spo2Value': recent_record.spo2Value,
#         'respRate': recent_record.respRate,
#     } if recent_record else {}

#     data = {
#         'patientData': patient_data,
#         'recentRecord': recent_record_data
#     }

#     return JsonResponse(data)


# @api_view(['GET'])
# def get_val_chart(request, patient_id):
#     try:
#         patient_records = PatientRecords.objects.filter(patientId=patient_id)
#         serializer = PatientRecordsSerializer(patient_records, many=True)
#         serialized_data = serializer.data

#         if serialized_data:
#             return JsonResponse(serialized_data, safe=False)
#         else:
#             return JsonResponse({'error': 'No records found for the patient.'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)


# @api_view(['GET'])
# def get_patient_vitals(request, patientId):
#     try:
#         filter_type = request.query_params.get('filter_type', None)
#         records = PatientRecords.objects.filter(patientId=patientId)

#         if filter_type == 'day':
#             records = records.filter(appointmentDate=datetime.now().date())
#         elif filter_type == 'month':
#             records = records.filter(appointmentDate__month=datetime.now().month)
#         elif filter_type == 'week':
#             start_of_week = datetime.now().date() - timedelta(days=datetime.now().weekday())
#             end_of_week = start_of_week + timedelta(days=6)
#             records = records.filter(appointmentDate__gte=start_of_week, appointmentDate__lte=end_of_week)

#         serializer = PatientRecordsSerializer(records, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except PatientRecords.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class ForgotPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         if not email:
#             return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.filter(email=email).first()
#         if user:
#             token_generator = PasswordResetTokenGenerator()
#             token = token_generator.make_token(user)
#             uid = urlsafe_base64_encode(force_bytes(user.pk))

#             current_site = get_current_site(request)
#             mail_subject = 'Reset your password'
#             message = render_to_string('reset_password_email.html', {
#                 'user': user,
#                 'domain': current_site.domain,
#                 'uid': uid,
#                 'token': token,
#             })
#             send_mail(mail_subject, message, 'noreply@yourdomain.com', [email])

#         return Response({"message": "If an account with that email exists, we have sent you an email with instructions to reset your password."}, status=status.HTTP_200_OK)


# class ResetPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, uidb64, token):
#         password = request.data.get('password')
#         if not password:
#             return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(pk=uid)

#             token_generator = PasswordResetTokenGenerator()
#             if token_generator.check_token(user, token):
#                 user.set_password(password)
#                 user.save()
#                 return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             return Response({"error": "Invalid UID"}, status=status.HTTP_400_BAD_REQUEST)


from django.shortcuts import render, get_object_or_404
from api.models import Profile, User, Patient, PatientRecords
from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PatientSerializer, PatientRecordsSerializer, PatientDropSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site

# Create your views here

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/patientslist/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        response = f"Hey {request.user}, You are seeing a GET response"
        return Response({'response': response}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        text = request.data.get("text")
        response = f"Hey {request.user}, Your text is {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


class PatientlistCreate(generics.CreateAPIView):
    queryset = Patient.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PatientSerializer


@api_view(['GET', 'POST'])
def patientslist(request):
    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientDropList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDropSerializer


class PatientRecordsListCreate(generics.ListCreateAPIView):
    queryset = PatientRecords.objects.all()
    serializer_class = PatientRecordsSerializer


@api_view(['POST'])
def patient_records_create(request):
    serializer = PatientRecordsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def patient_records_list(request):
    patientrecords = PatientRecords.objects.all()
    serializer = PatientRecordsSerializer(patientrecords, many=True)
    return Response(serializer.data)


@api_view(['GET'])
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

    recent_record_data = {
        'appointmentDate': recent_record.appointmentDate,
        'appointmentTime': recent_record.appointmentTime,
        'heartRate': recent_record.heartRate,
        'diastolicBP': recent_record.diastolicBP,
        'systolicBP': recent_record.systolicBP,
        'bodyTemp': recent_record.bodyTemp,
        'spo2Value': recent_record.spo2Value,
        'respRate': recent_record.respRate,
    } if recent_record else {}

    data = {
        'patientData': patient_data,
        'recentRecord': recent_record_data
    }

    return JsonResponse(data)


@api_view(['GET'])
def get_val_chart(request, patient_id):
    try:
        patient_records = PatientRecords.objects.filter(patientId=patient_id)
        serializer = PatientRecordsSerializer(patient_records, many=True)
        serialized_data = serializer.data

        if serialized_data:
            return JsonResponse(serialized_data, safe=False)
        else:
            return JsonResponse({'error': 'No records found for the patient.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
def get_patient_vitals(request, patientId):
    try:
        filter_type = request.query_params.get('filter_type', None)
        records = PatientRecords.objects.filter(patientId=patientId)

        if filter_type == 'day':
            records = records.filter(appointmentDate=datetime.now().date())
        elif filter_type == 'month':
            records = records.filter(appointmentDate__month=datetime.now().month)
        elif filter_type == 'week':
            start_of_week = datetime.now().date() - timedelta(days=datetime.now().weekday())
            end_of_week = start_of_week + timedelta(days=6)
            records = records.filter(appointmentDate__gte=start_of_week, appointmentDate__lte=end_of_week)

        serializer = PatientRecordsSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except PatientRecords.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user:
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            current_site = get_current_site(request)
            mail_subject = 'Reset your password'
            message = render_to_string('reset_password_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': uid,
                'token': token,
            })
            send_mail(mail_subject, message, 'noreply@yourdomain.com', [email])

        return Response({"message": "If an account with that email exists, we have sent you an email with instructions to reset your password."}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        password = request.data.get('password')
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            token_generator = PasswordResetTokenGenerator()
            if token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid UID"}, status=status.HTTP_400_BAD_REQUEST)
